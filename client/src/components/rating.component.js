import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FullStar = ({ color }) => (
  <FontAwesomeIcon icon={['fas', 'star']} style={{ color }} />
);

const HalfStar = ({ color }) => (
  <FontAwesomeIcon icon={['fas', 'star-half-alt']} style={{ color }} />
);

const Rating = ({ value, text, color }) => (
  <div className="rating">
    <span>
      {value >= 1 ? (
        <FullStar color={color} />
      ) : value >= 0.5 ? (
        <HalfStar color={color} />
      ) : null}
    </span>

    <span>
      {value >= 2 ? (
        <FullStar color={color} />
      ) : value >= 1.5 ? (
        <HalfStar color={color} />
      ) : null}
    </span>

    <span>
      {value >= 3 ? (
        <FullStar color={color} />
      ) : value >= 2.5 ? (
        <HalfStar color={color} />
      ) : null}
    </span>

    <span>
      {value >= 4 ? (
        <FullStar color={color} />
      ) : value >= 3.5 ? (
        <HalfStar color={color} />
      ) : null}
    </span>

    <span>
      {value >= 5 ? (
        <FullStar color={color} />
      ) : value >= 4.5 ? (
        <HalfStar color={color} />
      ) : null}
    </span>

    {text && <span>{text}</span>}
  </div>
);

export default Rating;
