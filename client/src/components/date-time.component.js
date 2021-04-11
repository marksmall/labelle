import { useEffect, useState } from 'react';

import { formatISO, setHours, setMinutes } from 'date-fns';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const START_TIME = setHours(setMinutes(new Date(), 0), 9);
const END_TIME = setHours(setMinutes(new Date(), 0), 18);
const DATE_FORMAT = 'MMMM d, yyyy h:mm aa';

const DateTime = ({ dates, setSelectedBookingDateTime }) => {
  const [bookingDateTime, setBookingDateTime] = useState(
    dates?.length > 0 ? new Date(dates[0]) : new Date(),
  );
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    dates.forEach(date =>
      setAvailableDates(previous => [...previous, new Date(date)]),
    );
  }, [dates, setAvailableDates]);

  console.log('BOOKING TIME: ', bookingDateTime);

  return (
    <DatePicker
      selected={bookingDateTime}
      onChange={date => {
        setBookingDateTime(date);
        setSelectedBookingDateTime(formatISO(date));
      }}
      showTimeSelect
      showMonthDropdown
      monthsShown={2}
      inline
      minTime={START_TIME}
      maxTime={END_TIME}
      includeDates={availableDates}
      includeTimes={availableDates}
      dateFormat={DATE_FORMAT}
    />
  );
};

export default DateTime;
