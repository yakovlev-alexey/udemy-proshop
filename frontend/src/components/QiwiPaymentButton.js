import React, { useState } from 'react'

import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import Message from './Message'

const QiwiPaymentButton = ({ order }) => {
  const [error, setError] = useState()

  const { userInfo } = useSelector((state) => state.userLogin)

  const payHandler = () => {
    const pay = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${order._id}/qiwi?successUrl=${window.location.href}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        })
        window.location.href = data.payUrl
      } catch (error) {
        setError(error)
      }
    }

    pay()
  }

  return (
    <React.Fragment>
      {error && <Message variant="danger">{error}</Message>}
      <Button variant="primary" onClick={payHandler} block>
        Pay with Qiwi
      </Button>
    </React.Fragment>
  )
}

export default QiwiPaymentButton
