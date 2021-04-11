import { action } from '@storybook/addon-actions';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ServiceCategoriesList from './service-categories-list.component';

import services from './services';

const Screen = {
  title: 'Booking/Service Categories List',
  args: { services },
  argTypes: {},
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

const Template = args => <ServiceCategoriesList {...args} />;

export const Default = Template.bind({});
