import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { location, defaultZoom, API_KEY } from 'map/map.constant';

import Contact from './contact.component';

const Screen = {
  title: 'Contact/Contact',
  args: { location, zoom: defaultZoom, apiKey: API_KEY },
  argTypes: {},
  decorators: [
    Story => {
      const history = createMemoryHistory({ initialEntries: ['/'] });

      return (
        <Router history={history}>
          <Story />
        </Router>
      );
    },
  ],
};

export default Screen;

const Template = args => <Contact {...args} />;

export const Default = Template.bind({});
