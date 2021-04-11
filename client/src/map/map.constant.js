export const API_KEY = '';

export const location = {
  company: 'Labelle Beauty',
  address: '180 Causewayside',
  city: 'Edinburgh',
  postcode: 'EH9 1PN',
  lat: 55.935684,
  lng: -3.179938,
};

export const defaultZoom = 20;

const directionsLocation = encodeURIComponent(
  `${location.company} ${location.address} ${location.city} ${location.postcode}`,
);
export const directionsLink = `https://maps.google.com/maps?ll=${location.lat},${location.lng}&z=18&t=m&hl=en-GB&gl=US&mapclient=embed&daddr=${directionsLocation}@${location.lat},${location.lng}`;

const query = encodeURIComponent(
  `${location.company} ${location.address} ${location.city} ${location.postcode}`,
);
export const externalMapLink = `https://maps.google.com/maps?ll=${location.lat},${location.lng}&z=18&t=m&hl=en-GB&gl=US&mapclient=embed&q=${query}`;
