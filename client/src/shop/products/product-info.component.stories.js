import ProductInfo from './product-info.component';

import products from 'products';

const Screen = {
  title: 'Shop/Product Info',
  args: {
    product: products[1],
  },
  argTypes: {},
  decorators: [],
};

export default Screen;

const Template = args => <ProductInfo {...args} />;

export const Default = Template.bind({});
