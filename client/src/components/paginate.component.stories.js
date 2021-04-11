import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Paginate from './paginate.component';

const Screen = {
  title: 'Components/Paginate',
  args: {
    pages: 5,
    page: 2,
    keyword: '?keyword=test&page=2',
  },
  // argTypes: {
  //   activateAccount: { action: 'activateAccount' },
  //   login: { action: 'login' },
  // },
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

// const Template = args => <Paginate {...args} />;

// export const Default = Template.bind({});
