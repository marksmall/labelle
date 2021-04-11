import {
  location,
  defaultZoom,
  API_KEY,
  directionsLink,
  externalMapLink,
} from './map.constant';

import Map from './map.component';

const Screen = {
  title: 'Contact/Map',
  args: {
    location,
    zoom: defaultZoom,
    apiKey: API_KEY,
    directionsLink,
    externalMapLink,
  },
  argTypes: {},
};

export default Screen;

const Template = args => <Map {...args} />;

export const Default = Template.bind({});
