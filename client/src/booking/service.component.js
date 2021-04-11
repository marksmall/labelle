import { useEffect, useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';

import { Form } from 'react-bootstrap';

import ServiceCategoriesList from './service-categories-list.component';
import ServiceList from './service-list.component';
import ServiceCategoriesItemList from './service-categories-item-list.component';

import DateTime from 'components/date-time.component';

// import { setSelectedServiceType } from './service.slice';

// import services from './services';

// const dates = [
//   '2021-04-27T10:00:00',
//   '2021-04-27T11:00:00',
//   '2021-04-27T12:00:00',
//   '2021-04-27T13:00:00',
//   '2021-04-28T14:00:00',
//   '2021-04-28T15:00:00',
//   '2021-04-28T16:00:00',
// ];

const Service = ({ services, employees, isLoading, serverErrors }) => {
  // console.log('SERVICES: ', services);

  // const dispatch = useDispatch();

  const [selectedServiceType, setSelectedServiceType] = useState(
    services?.length > 0 ? services[0] : null,
  );
  const [serviceCategory, setServiceCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBookingDateTime, setSelectedBookingDateTime] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(undefined);
  const [dates, setDates] = useState([]);

  // console.log('SELECTED SERVICE: ', selectedServiceType);
  // console.log('SELECTED Date Time: ', selectedBookingDateTime);
  console.log('Dates: ', dates);

  useEffect(() => {
    if (employees && !selectedEmployee) {
      const employeeDates = employees.reduce(
        (acc, employee) => new Set([...acc, ...new Set(employee.availability)]),
        new Set(),
      );

      setDates(
        Array.from(employeeDates).sort((a, b) => new Date(a) - new Date(b)),
      );
    } else if (employees && selectedEmployee) {
      setDates(
        selectedEmployee.availability.sort((a, b) => new Date(a) - new Date(b)),
      );
    }
  }, [employees, selectedEmployee]);

  // const employeeNames = employees.map(employee => employee.name);

  return (
    <div>
      Service Component
      {services && (
        <ServiceCategoriesList
          services={services}
          setSelectedServiceType={service => setSelectedServiceType(service)}
        />
      )}
      {selectedServiceType && (
        <ServiceList
          categories={selectedServiceType.categories}
          setServiceCategory={setServiceCategory}
        />
      )}
      {serviceCategory && (
        <ServiceCategoriesItemList
          serviceItems={serviceCategory.services}
          setSelectedService={item => setSelectedService(item)}
        />
      )}
      {selectedService && (
        <>
          <Form.Control
            as="select"
            value={selectedEmployee}
            onChange={event => setSelectedEmployee(event.target.value)}
          >
            {employees &&
              employees.map(employee => (
                <option key={employee.name} value={employee.name}>
                  {employee.name}
                </option>
              ))}
          </Form.Control>
          <DateTime
            dates={dates}
            setSelectedBookingDateTime={datetime =>
              setSelectedBookingDateTime(datetime)
            }
          />
        </>
      )}
    </div>
  );
};

export default Service;
