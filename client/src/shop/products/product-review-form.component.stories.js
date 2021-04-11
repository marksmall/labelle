import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ProductReviewForm from './product-review-form.component';

const Screen = {
  title: 'Shop/Product Review',
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

const Template = args => <ProductReviewForm {...args} />;

export const Default = Template.bind({});

export const IsLoading = Template.bind({});
IsLoading.args = { isLoading: true };

export const serverError = Template.bind({});
serverError.args = { serverErrors: ['Rating not valid', 'Review Required'] };
