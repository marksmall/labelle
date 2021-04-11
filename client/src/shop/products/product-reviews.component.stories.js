import ProductReviews from './product-reviews.component';

import products from 'products';

const Screen = {
  title: 'Shop/Product Reviews',
  args: {
    user: {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@test.com',
      isAdmin: true,
    },
    product: products[1],
  },
  argTypes: { createProductReview: { action: 'createProductReview' } },
  decorators: [],
};

export default Screen;

const Template = args => <ProductReviews {...args} />;

export const WithReviews = Template.bind({});

export const NoReviews = Template.bind({});
NoReviews.args = {
  product: products[2],
};

export const IsLoading = Template.bind({});
IsLoading.args = { isLoading: true };

export const serverError = Template.bind({});
serverError.args = {
  serverErrors: ['Review not accepted', 'Comment Required'],
};
