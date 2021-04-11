import { useState } from 'react';

import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
} from '@react-google-maps/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './map.scss';

const LocationPin = ({ location, directionsLink, externalMapLink }) => (
  <div className="location">
    <div className="description">
      <h5>{location.company}</h5>

      <div>
        <div>{location.address}</div>
        <div>{location.city}</div>
        <div>{location.postcode}</div>
      </div>

      <div className="links">
        <a href={directionsLink} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={['fas', 'directions']} />
          Directions
        </a>

        <a href={externalMapLink} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={['fas', 'external-link-alt']} />
          View external map
        </a>
      </div>
    </div>
  </div>
);

const MapWrapper = ({
  location,
  zoom,
  apiKey,
  directionsLink,
  externalMapLink,
}) => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <h2>Come Visit Us</h2>

      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          zoom={zoom}
          center={location}
        >
          <Marker
            position={location}
            onClick={() => setSelected(true)}
            label={location.company}
          />
          {selected && (
            <InfoWindow
              position={location}
              onCloseClick={() => setSelected(false)}
            >
              <LocationPin
                location={location}
                directionsLink={directionsLink}
                externalMapLink={externalMapLink}
              />
              {/* <p>Some Text</p> */}
            </InfoWindow>
          )}
          {/* <LocationPin location={location} /> */}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapWrapper;
