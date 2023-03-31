import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import {useState} from "react";
import { Redirect } from "react-router-dom";

function LoginFormPage() {
    const dispatch = useDispatch();
    const session = useSelector(state => state.session);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    if (session.user !== null) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
          .catch(async (res) => {
            let data;
            try {
              data = await res.clone().json();
            } catch {
              data = await res.text();
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
        });
    }

    return(
        <form className="credential-form" id="login-form" onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <label>Email
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} required/>
            </label>
            <label>Password
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
            </label>
            <button type="submit">Log In</button>
        </form>
    )
}

export default LoginFormPage;