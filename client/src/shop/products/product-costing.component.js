import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';

const ProductCosting = ({ product, quantity, setQuantity, addToCart }) => {
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col>Price:</Col>
            <Col>
              <strong>£{product.price}</strong>
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Status:</Col>
            <Col>
              {product.number_in_stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Col>
          </Row>
        </ListGroup.Item>

        {product.number_in_stock > 0 && (
          <ListGroup.Item>
            <Row>
              <Col>
                <Form.Label htmlFor="quantity">Quantity</Form.Label>
              </Col>
              <Col xs="auto" className="my-1">
                <Form.Control
                  as="select"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={event => setQuantity(event.target.value)}
                >
                  {[...Array(product.number_in_stock).keys()].map(prod => (
                    <option key={prod + 1} value={prod + 1}>
                      {prod + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
        )}

        <ListGroup.Item>
          <Button
            type="button"
            className="btn-block"
            onClick={() => addToCart({ ...product, quantity })}
            disabled={product.number_in_stock === 0}
          >
            Add to Cart
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProductCosting;
