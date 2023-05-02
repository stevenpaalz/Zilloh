import csrfFetch from './csrf';

const SET_LISTINGS = 'listings/setListings';
const ADD_LISTING = 'listings/addListing';
const REMOVE_LISTING = 'listings/removeListing';

const setListings = (listings) => ({
    type: SET_LISTINGS,
    listings
})

const addListing = (listing) => ({
    type: ADD_LISTING,
    listing
})

const removeListing = (listingId) => ({
    type: REMOVE_LISTING,
    listingId
})

export const fetchListings = () => async dispatch => {
    
    const res = await csrfFetch('/api/listings');
    const data = await res.json();
    const listings = {listings: {}, listingsIds: {}};
    data.listings.forEach((el)=>{
        listings.listings[el.listing.id] = el.listing
    })
    listings.listingsIds = data.listingsIds
    dispatch(setListings(listings));
}

export const searchListings = (query, type) => async dispatch => {
    let typeString = "";
    let queryString = "";
    let andString = "";
    if (type) {typeString = `type=${type}`;}
    if (query) {queryString = `q=${query}`;}
    if (type && query) {andString = "&"}
    const res = await csrfFetch(`/api/search?${queryString}${andString}${typeString}`);
    const data = await res.json();
    const listings = {listings: {}, listingsIds: {}};
    data.listings.forEach((el)=>{
        listings.listings[el.listing.id] = el.listing
    })
    listings.listingsIds = data.listingsIds
    dispatch(setListings(listings));
}

export const userListings = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/listings`);
    const data = await res.json();
    const listings = {listings: {}, listingsIds: {}};
    data.listings.forEach((el)=>{
        listings.listings[el.listing.id] = el.listing
    })
    listings.listingsIds = data.listingsIds
    dispatch(setListings(listings));
}

export const fetchListing = (listingId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}`)
    const data = await res.json();
    dispatch(addListing(data.listing));
}

export const createListing = (formData) => async dispatch => {
    const res = await csrfFetch('/api/listings/', {
        method: 'POST',
        body: formData
    })
    const data = await res.json();
    dispatch(addListing(data.listing));
    return data.listing.id;
}

export const updateListing = (listingId, formData) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}`,{
        method: 'PATCH',
        body: formData
    });
    const data = await res.json();
    dispatch(addListing(data.listing));
    return data.listing.id;
}

export const deleteListing = (listingId, userId) => async dispatch => {
    const res = await csrfFetch(`/api/listings/${listingId}`,{
        method: 'DELETE',
        body: JSON.stringify(listingId)
    })
    dispatch(userListings(userId));
}

function listingsReducer(state={}, action) {
    let newState = {...state}
    switch (action.type) {
        case SET_LISTINGS:
            return {...action.listings};
        case ADD_LISTING:
            newState[action.listing.id] = action.listing;
            return newState;
        case REMOVE_LISTING:
            delete newState.listings[action.listingId];
            let idx = newState.listingsIds.indexOf(action.listingId);
            newState.listingsIds.splice(idx, 1)
            return newState;
        default:
            return state;
    }
}

export default listingsReducer;