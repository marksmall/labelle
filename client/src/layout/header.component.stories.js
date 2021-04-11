import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from './header.component';

const Screen = {
  title: 'Layout/Header',
  args: {},
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

const Template = args => <Header {...args} />;

export const Default = Template.bind({});
