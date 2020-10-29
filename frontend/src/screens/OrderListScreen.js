import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listOrders, deleteOrder, toggleDelivered } from '../actions/orderActions'

import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = ({ history }) => {
  const { loading, error, orders } = useSelector((state) => state.orderList)

  const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector(
    (state) => state.orderDelete
  )

  const { loading: loadingDelivered, error: errorDelivered, success: successDelivered } = useSelector(
    (state) => state.orderToggleDelivered
  )

  const { userInfo } = useSelector((state) => state.userLogin)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } else {
      dispatch(listOrders())
    }
  }, [history, userInfo, dispatch, successDelete, successDelivered])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(id))
    }
  }

  const toggleDeliveredHandler = (id) => {
    dispatch(toggleDelivered(id))
  }

  return (
    <React.Fragment>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          {(loadingDelivered || loadingDelete) && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {errorDelivered && <Message variant="danger">{errorDelivered}</Message>}
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>TOTAL PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link to={`/order/${order._id}`}>{order._id}</Link>
                  </td>
                  <td>
                    <Link to={`/admin/user/${order.user._id}/edit`}>{order.user.name}</Link>
                    {' | '}
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Button
                      variant={order.isDelivered ? 'dark' : 'light'}
                      className="btn-sm"
                      onClick={() => toggleDeliveredHandler(order._id)}>
                      <i className={order.isDelivered ? 'fas fa-times' : 'fas fa-check'} />{' '}
                      {order.isDelivered ? 'Mark as not delivered' : 'Mark as delivered'}
                    </Button>
                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(order._id)}>
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

export default OrderListScreen
