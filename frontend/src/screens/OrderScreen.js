import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image } from 'react-bootstrap'

import Message from '../components/Message'
import { listOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'

import QiwiPaymentButton from '../components/QiwiPaymentButton'
import PaypalPaymentButton from '../components/PaypalPaymentButton'

const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

const renderPaymentButton = (order, updateOrder) => {
  if (order.paymentMethod === "PayPal") {
    return <PaypalPaymentButton order={order} updateOrder={updateOrder} />
  } else if (order.paymentMethod === "Qiwi") {
    return <QiwiPaymentButton order={order} />
  }
}

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const { order, loading, error } = useSelector((state) => state.orderDetails)

  const { userInfo } = useSelector((state) => state.userLogin)

  const dispatch = useDispatch()

  const updateOrder = () => dispatch(listOrderDetails(orderId))

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } else if (!order || order._id !== orderId) {
      updateOrder()
    }
    // eslint-disable-next-line
  }, [order, orderId, dispatch, userInfo])

  if (loading) {
    return <Loader />
  } else if (error) {
    return <Message variant="danger">{error}</Message>
  }

  const { orderItems, shippingAddress, paymentMethod } = order
  const itemsPrice = addDecimals(
    orderItems && orderItems.length > 0 ? orderItems.reduce((acc, item) => acc + item.qty * item.price, 0) : 0
  )

  return (
    <React.Fragment>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </p>
              <p>
                {order.isDelivered ? (
                  <Message variant="success">Delivered on {order.deliveredAt}</Message>
                ) : (
                  <Message variant="danger">Not delivered</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
              <p>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not paid</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <p>
                <strong>Method: </strong>
                {orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
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
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            {!order.isPaid && (
              <ListGroup.Item>
                {renderPaymentButton(order, updateOrder)}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default OrderScreen
