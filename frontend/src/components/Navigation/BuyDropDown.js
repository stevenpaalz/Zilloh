import './BuyDropDown.css';
import { Link } from 'react-router-dom';

function BuyDropDown() {

    return(
        <div className='main-dropdown'>
            <div id='buy-dropdown' className="dropdown-subnav">
                <div>
                    <h3>Homes for sale</h3>
                    <ul id='buy-dropdown-col1' className='main-dropdown-col'>
                        <li><Link to="/">Homes for sale</Link></li>
                        <li><Link to="/">Foreclosures</Link></li>
                        <li><Link to="/">For sale by owner</Link></li>
                        <li><Link to="/">Open houses</Link></li>
                        <li><Link to="/">New construction</Link></li>
                        <li><Link to="/">Coming soon</Link></li>
                        <li><Link to="/">Recent home sales</Link></li>
                        <li><Link to="/">All homes</Link></li>
                    </ul>
                </div>
                <div className='not-first-col-main-dropdown'>
                    <h3>Resources</h3>
                        <ul id='buy-dropdown-col2' className='main-dropdown-col'>
                            <li><Link to="/">Buyers Guide</Link></li>
                            <li><Link to="/">Foreclosure center</Link></li>
                            <li><Link to="/">Real estate app</Link></li>
                            <li><Link to="/">Down payment assistance</Link></li>
                        </ul>
                </div>
            </div>
        </div>
    )
}

export default BuyDropDown;