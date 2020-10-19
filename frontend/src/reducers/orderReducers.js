import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAYPAL_RESET,
  ORDER_PAYPAL_REQUEST,
  ORDER_PAYPAL_SUCCESS,
  ORDER_PAYPAL_FAIL
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYPAL_REQUEST:
      return { loading: true }
    case ORDER_PAYPAL_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAYPAL_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_PAYPAL_RESET:
      return {}
    default:
      return state
  }
}
