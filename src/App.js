import { AutoComplete, Layout } from 'antd';
import { useState } from 'react';
import MapLocator from './components/map.locator';
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, setUserSelectedPlaces } from './reducers/googleMapLocReducer';
import MapData from "./db/places.json";

const { Content } = Layout;
function App() {
  const places = useSelector(state => state.google.places.data);
  const dispatch = useDispatch();
  const [selectePlace, setSelectedPlace] = useState(null);
  const getSelectedPlace = (id) => {
    return MapData.find(item => item.id === id);
  }
  const onSelectPlace = (value) => {
    const selected = getSelectedPlace(value);
    setSelectedPlace(selected);
    dispatch(setUserSelectedPlaces(selected));
  }
  const handleInputChange = (value) => {
    setSelectedPlace(value);
    dispatch(getLocations(value));
  }
  return (
    <Layout>
      <Layout.Content>
          <AutoComplete
            style={{ width: 400,marginLeft:'40%',position:'absolute',zIndex:"9999",paddingTop:"10px"}}
            placeholder="Search places"
            value={selectePlace?.formatted_address}
            onChange={(value) => handleInputChange(value)}
            onSelect={onSelectPlace}
            options={places}
          />
          <MapLocator coOrdinates={selectePlace ? { lat: selectePlace.geometry?.location?.lat, lng: selectePlace.geometry?.location?.lng } : { lat: 34.091158, lng: -118.2795188 }} />
      </Layout.Content>
    </Layout>
  );
}

export default App;