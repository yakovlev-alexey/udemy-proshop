import React, { useMemo, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image } from 'react-bootstrap'

import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

const PlaceOrderScreen = ({ history }) => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector((state) => state.cart)

  if (!shippingAddress) {
    history.push('/shipping')
  } else if (!paymentMethod) {
    history.push('/payment')
  }

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = useMemo(() => {
    const itemsPrice = addDecimals(
      cartItems && cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) : 0
    )
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100)
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))
    const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice))

    return { itemsPrice, shippingPrice, taxPrice, totalPrice }
  }, [cartItems])

  const { order, success, error } = useSelector((state) => state.orderCreate)

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [success, history])

  const dispatch = useDispatch()

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      })
    )
  }

  return (
    <React.Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <p>
                <strong>Method: </strong>
                {cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${addDecimals(item.qty * item.price)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={placeOrderHandler}>
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default PlaceOrderScreen
