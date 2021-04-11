import { Container, Col, Row } from 'react-bootstrap';

const Form = ({ children }) => (
  <Container>
    <Row className="justify-content-md-center">
      <Col xs={12} md={0}>
        {children}
      </Col>
    </Row>
  </Container>
);

export default Form;
