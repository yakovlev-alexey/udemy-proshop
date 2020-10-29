import React, { useEffect } from 'react'

import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { deleteProduct, listProducts, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductListScreen = ({ history, match }) => {
  const { loading, error, products } = useSelector((state) => state.productList)

  const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector(
    (state) => state.productDelete
  )

  const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = useSelector(
    (state) => state.productCreate
  )

  const { userInfo } = useSelector((state) => state.userLogin)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
      return
    }
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push(`/admin/products/${createdProduct._id}/edit`)
    }
    dispatch(listProducts())
  }, [history, userInfo, dispatch, successDelete, successCreate, createdProduct])

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product? Related orders may also get invalidated')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <React.Fragment>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus" /> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          {(loadingDelete || loadingCreate) && <Loader />}
          {errorDelete ? (
            <Message variant="danger">{errorDelete}</Message>
          ) : (
            successDelete && <Message variant="success">Product removed successfully</Message>
          )}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ProductListScreen
