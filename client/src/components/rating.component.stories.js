import Rating from './rating.component';

const Screen = {
  title: 'Components/Rating',
};

export default Screen;

export const Ratings = () => (
  <>
    <Rating value={0.3} text="0.3 Star Rating" color="#f8e825" />
    <Rating value={0.5} text="0.5 Star Rating" color="#f8e825" />
    <Rating value={1} text="1 Star Rating" color="#f8e825" />
    <Rating value={1.5} text="1.5 Star Rating" color="#f8e825" />
    <Rating value={2} text="2 Star Rating" color="#f8e825" />
    <Rating value={2.6} text="2.6 Star Rating" color="#f8e825" />
    <Rating value={3} text="3 Star Rating" color="#f8e825" />
    <Rating value={3.7} text="3.7 Star Rating" color="#f8e825" />
    <Rating value={4} text="4 Star Rating" color="#f8e825" />
    <Rating value={4.8} text="4.8 Star Rating" color="#f8e825" />
    <Rating value={5} text="5 Star Rating" color="#f8e825" />
    <Rating value={5.9} text="5.9 Star Rating" color="#f8e825" />
    <Rating value={6} text="6 Star Rating" color="#f8e825" />
  </>
);
