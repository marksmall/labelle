import { action } from '@storybook/addon-actions';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ServiceList from './service-list.component';

import services from './services';

const categories = services[services.length - 1].categories;

const Screen = {
  title: 'Booking/Service List',
  args: { categories },
  argTypes: { setServiceCategory: { action: 'setServiceCategory' } },
  decorators: [
    Story => {
      const history = createMemoryHistory({ initialEntries: ['/'] });
      history.push = action('history.push');

      return (
        <Router history={history}>
          <Story />
        </Router>
      );
    },
  ],
};

export default Screen;

const Template = args => <ServiceList {...args} />;

export const Default = Template.bind({});
