import { httpClient } from '../httpClient';
import MapData from '../db/places.json';
const SET_LOCATION = "setLocation";
const SET_USER_SELECTED_PLACES="setUserSelectedPlaces";
const setLocations = (payload) => {
    return {
        type: SET_LOCATION,
        payload
    }
}
const setUserSelectedPlaces = (payload) => {
    return {
        type: SET_USER_SELECTED_PLACES,
        payload
    }
}
const getLocations = (key) => {
    // connecting to google maps api
    // return async function(dispatch){
    //     const response = await httpClient.get(`place/autocomplete/json?input=${key}&types=geocode&language=en&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
    //     if (response.ok) {
    //         dispatch(setLocations(response.data));
    //     }
    // }

    // Connecting to local data
    const filterData = MapData.filter(item => item.formatted_address.toLowerCase().includes(key.toLowerCase()));
    return function (dispatch) {
        dispatch(setLocations(filterData.map(item => { 
            return { label: item.formatted_address, value: item?.id } 
        })));
    }
}

let initialState = {
    places: { loading: true, data: [] },
    previousSelected:{}
}
const googleMapReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCATION:
            state = { ...state, places: { loading: false, data: action.payload } };
            return state;
            case SET_USER_SELECTED_PLACES:
                state = {...state,previousSelected:action.payload}
                return state;
        default:
            return state;
    }
}
export { getLocations,setUserSelectedPlaces }
export default googleMapReducer;