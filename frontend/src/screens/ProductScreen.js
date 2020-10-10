import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()

  const { loading, error, product } = useSelector((state) => state.productDetails)

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [match, dispatch])

  return (
    <React.Fragment>
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button disabled={product.countInStock === 0} className="btn-block" type="button">
                    ADD TO CART
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </React.Fragment>
  )
}

export default ProductScreen
