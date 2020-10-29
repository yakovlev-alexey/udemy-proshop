import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAYPAL_REQUEST,
  ORDER_PAYPAL_SUCCESS,
  ORDER_PAYPAL_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_TOGGLE_DELIVERED_FAIL,
  ORDER_TOGGLE_DELIVERED_SUCCESS,
  ORDER_TOGGLE_DELIVERED_REQUEST
} from '../constants/orderConstants'
import { CART_RESET } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post('/api/orders', order, config)

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    dispatch({ type: CART_RESET })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get('/api/orders/my', config)

    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAYPAL_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/api/orders/${id}/paypal`, paymentResult, config)

    dispatch({ type: ORDER_PAYPAL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_PAYPAL_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get('/api/orders', config)

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/api/orders/${id}`, config)

    dispatch({ type: ORDER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const toggleDelivered = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_TOGGLE_DELIVERED_REQUEST })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.post(`/api/orders/${id}/delivered`, {}, config)

    dispatch({ type: ORDER_TOGGLE_DELIVERED_SUCCESS })
  } catch (error) {
    dispatch({
      type: ORDER_TOGGLE_DELIVERED_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
