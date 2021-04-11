import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Header from './header.component';
import Footer from './footer.component';

const user = {};

const Screen = {
  title: 'Layout/Page',
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

const Template = args => (
  <div>
    <Header user={user} />
    <main>Some Content</main>
    <Footer />
  </div>
);

export const Default = Template.bind({});
