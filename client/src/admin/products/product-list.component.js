import { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import { Button, Table, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LoadingSpinner from 'components/loading-spinner.component';
import Message from 'components/message.component';
import Paginate from 'components/paginate.component';

import { LOGIN_URL } from 'accounts/accounts.constants';

import { ADMIN_PRODUCTS_URL } from 'admin/admin.constants';

const ProductList = ({
  isLoading = false,
  user,
  products,
  fetchProducts,
  createProduct,
  deleteProduct,
  serverErrors,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (user && user.isAdmin) {
      fetchProducts();
    } else {
      history.push(LOGIN_URL);
    }
  }, [user, fetchProducts, history]);

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Admin Products List</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={() => createProduct()}>
            <FontAwesomeIcon icon={['fas', 'plus']} /> Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <LoadingSpinner />
      ) : serverErrors ? (
        <Message variant="danger">
          {serverErrors.map(err => (
            <div key={err}>{err}</div>
          ))}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <caption className="hidden">User List</caption>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>£{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer
                      to={`${ADMIN_PRODUCTS_URL}/${product.id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <>
                          <span className="hidden">Edit {product.id}</span>
                          <FontAwesomeIcon icon={['fas', 'edit']} />
                        </>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <>
                        <span className="hidden">Delete {product.id}</span>
                        <FontAwesomeIcon icon={['fas', 'trash']} />
                      </>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </div>
  );
};

export default ProductList;
