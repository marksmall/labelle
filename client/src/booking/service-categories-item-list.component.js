import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const ServiceCategoriesItemList = ({ serviceItems, setSelectedService }) => {
  // console.log('SERVICE ITEMS: ', serviceItems);
  const [active, setActive] = useState(serviceItems[0].name);

  const onClick = category => {
    console.log('Clicked: ', category.name);
    setActive(category.name);

    setSelectedService(category);
  };

  return (
    <ListGroup as="ul">
      {serviceItems.map(category => {
        // console.log(
        //   'CATEGORY: ',
        //   category,
        //   category.name === active ? 'active' : '',
        // );

        return (
          <ListGroup.Item
            as="li"
            key={category.name}
            onClick={() => onClick(category)}
            {...(category.name === active ? { active: 'active' } : null)}
          >
            {category.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default ServiceCategoriesItemList;
