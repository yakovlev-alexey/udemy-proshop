import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'

import Loader from './Loader'
import { payOrder } from '../actions/orderActions'
import { ORDER_PAYPAL_RESET, ORDER_PAYPAL_FAIL } from '../constants/orderConstants'
import Message from './Message'

const PaypalPaymentButton = ({ order, updateOrder }) => {
  const [sdkReady, setSdkReady] = useState(false)

  const { loading, success, error } = useSelector((state) => state.orderPay)

  const dispatch = useDispatch()

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/payments/paypal')

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (success) {
      updateOrder()
      dispatch({ type: ORDER_PAYPAL_RESET })
    } else if (!window.paypal) {
      addPaypalScript()
    } else {
      setSdkReady(true)
    }
  }, [success, dispatch, updateOrder])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order._id, paymentResult))
  }

  const failPaymentHandler = (error) => {
    dispatch({ type: ORDER_PAYPAL_FAIL, payload: error })
  }

  return (
    <React.Fragment>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {sdkReady ? (
        <Loader />
      ) : (
        <PayPalButton
          amount={order.totalPrice}
          shippingPreference="NO_SHIPPING"
          onSuccess={successPaymentHandler}
          onError={failPaymentHandler}
        />
      )}
    </React.Fragment>
  )
}

export default PaypalPaymentButton
