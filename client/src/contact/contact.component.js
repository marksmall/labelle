import { location, defaultZoom, API_KEY } from 'map/map.constant';

import Map from 'map/map.component';

import ContactForm from './contact-form.component';

const Contact = () => {
  return (
    <>
      <ContactForm
        isLoading={false}
        contactUs={() => console.log('Submit contact form')}
        serverError={[]}
        user={null}
      />

      <Map location={location} zoom={defaultZoom} apiKey={API_KEY} />
    </>
  );
};

export default Contact;
