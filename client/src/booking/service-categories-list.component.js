import { Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ServiceCategoriesList = ({ services, setSelectedServiceType }) => {
  return (
    <ButtonGroup aria-label="categories">
      {/* <Button
        // className="btn-block"
        variant="outline-dark"
        onClick={() => console.log('Clicked All')}
      >
        <div>
          <FontAwesomeIcon icon={['fas', 'th-large']} />
        </div>
        <div>All</div>
      </Button> */}
      {services.map(service => (
        <Button
          key={service.name}
          // className="btn-block"
          // block
          variant="outline-dark"
          onClick={() => setSelectedServiceType(service)}
        >
          <div>
            <FontAwesomeIcon icon={['fas', service.icon]} />
          </div>
          <div>{service.name}</div>
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ServiceCategoriesList;
