import { Map,GoogleApiWrapper,Marker } from "google-maps-react";
const style = {
    width:"100%",
    height:"100%"
  }
const MapLocator = (props) => {
    return <>
        <Map
          initialCenter={props.coOrdinates}
          google={props.google}
          zoom={14}
          containerStyle={style}
          center={{lat: props.coOrdinates.lat,lng: props.coOrdinates.lng}}>
          <Marker  position={{ lat: props.coOrdinates.lat,lng: props.coOrdinates.lng}}/>
        </Map>
    </>
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapLocator);