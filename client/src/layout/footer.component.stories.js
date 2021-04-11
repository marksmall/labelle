import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Footer from './footer.component';

const Screen = {
  title: 'Layout/Footer',
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

const Template = args => <Footer {...args} />;

export const Default = Template.bind({});
