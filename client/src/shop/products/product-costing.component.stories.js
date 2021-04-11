import ProductCosting from './product-costing.component';

import products from 'products';

const Screen = {
  title: 'Shop/Product Costing',
  args: {
    product: products[1],
    quantity: 2,
  },
  argTypes: {
    setQuantity: { action: 'setQuantity' },
    addToCart: { action: 'addToCart' },
  },
  decorators: [],
};

export default Screen;

const Template = args => <ProductCosting {...args} />;

export const Default = Template.bind({});
