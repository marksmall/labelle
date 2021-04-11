import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const ServiceList = ({ categories, setServiceCategory }) => {
  // console.log('CATEGORIES: ', categories);
  const [active, setActive] = useState(categories[0].name);
  // console.log('ACTIVE ITEM: ', active);

  const onClick = category => {
    // console.log('Clicked: ', category.name);
    setActive(category.name);

    setServiceCategory(category);
  };

  return (
    <ListGroup as="ul">
      {categories.map(category => {
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

export default ServiceList;
