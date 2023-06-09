import "./YourHomes.css";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, userListings } from "../../store/listings";
import ListingIndexItem from "../ListingIndexPage/ListingIndexItem";
import { deleteListing } from "../../store/listings";
import { setModal } from "../../store/modal";

function YourHomes() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    if (!sessionUser) {
        history.push("/");
    }

    const userId = useParams().userId;

    const listings = useSelector(state => state.listings.listings);

    const openEdit = (e) => {
        history.replace(`/homes/${e.target.value}/edit`)
    }
    
    const removeListing = (e) => {
        let listingId = e.target.value
        dispatch(deleteListing(listingId, userId))
    }

    useEffect(()=>{
        if (!userId) return;
        dispatch(userListings(userId))
    }, [dispatch])

    const nextScroll = (e) => {
        e.preventDefault();
        const yourHomeCarousel = document.getElementById('your-home-carousel');
        const lastListingItem = document.querySelector('#your-home-carousel li.house-package:last-child');
        let rect = lastListingItem.getBoundingClientRect();
        const extra = ((rect.left - 82) % 359);
        yourHomeCarousel.scrollBy({left: 359 + extra});
    }

    const prevScroll = (e) => {
        e.preventDefault();
        const yourHomeCarousel = document.getElementById('your-home-carousel');
        const lastListingItem = document.querySelector('#your-home-carousel li.house-package:last-child');
        let rect = lastListingItem.getBoundingClientRect();
        const extra = (359 - ((rect.left - 82) % 359));
        yourHomeCarousel.scrollBy({left: -359 - extra});
    }

    const scrollHandler = () => {
        const yourHomeCarousel = document.getElementById('your-home-carousel')
        const nextButton = document.getElementById('next-button');
        const previousButton = document.getElementById('previous-button');
        if (yourHomeCarousel.scrollLeft === 0) {
            previousButton.setAttribute('disabled', true);
        } else { previousButton.removeAttribute('disabled');}

        const lastCarouselItem = document.querySelector('#your-home-carousel li.house-package:last-child')
        const rect = lastCarouselItem.getBoundingClientRect();
        if ((rect.right) <= window.innerWidth - (window.innerWidth*.08)) {
            nextButton.setAttribute('disabled', true);
        } else {nextButton.removeAttribute('disabled');}
    }
    
    useEffect(()=> {
        if (!listings || Object.values(listings).length === 0) return;
        const previousButton = document.getElementById('previous-button');
        previousButton.setAttribute('disabled', true);
    }, [])

    if (!listings) return(
        <h1>Loading...</h1>
    )

    return(
        <div id="your-home-container">
            <div className='open-sans' id='your-home-listings-nav'>
                <div id='your-home-listings-headers'>
                    <h3>Your homes</h3>
                </div>
                {Object.values(listings).length !== 0 && <div id='your-home-listings-scroller'>
                    <button id='previous-button' onClick={prevScroll}><i className="fa-solid fa-chevron-left"></i></button>
                    <button id='next-button' onClick={nextScroll}><i className="fa-solid fa-chevron-right"></i></button>
                </div>}
            </div>
            <div id="your-home-body">

                <ul id='your-home-carousel' onScroll={scrollHandler}>
                    {Object.values(listings).length === 0 && <li className="no-homes-message">No homes listed yet</li>}
                    {Object.values(listings).length !== 0 && Object.values(listings).map((listing)=>{
                        return(
                            <li key={listing.id} className="house-package">
                                <ul>
                                    <ListingIndexItem listing={listing} />
                                </ul>
                                <div id="change-buttons" className="open-sans">
                                    <button onClick={openEdit} value={listing.id} id="update-button">Update<i className="fa-solid fa-pencil"></i></button>
                                    <button onClick={removeListing} value={listing.id} id="delete-button">Delete<i className="fa-regular fa-trash-can"></i></button>
                                </div>
                            </li>

                        )
                    })}
                </ul>
            </div>

        </div>
    )
}

export default YourHomes;