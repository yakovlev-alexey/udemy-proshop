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
  ORDER_PAYPAL_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_TOGGLE_DELIVERED_REQUEST,
  ORDER_TOGGLE_DELIVERED_SUCCESS,
  ORDER_TOGGLE_DELIVERED_FAIL
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

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true }
    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload }
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true }
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderToggleDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_TOGGLE_DELIVERED_REQUEST:
      return { loading: true }
    case ORDER_TOGGLE_DELIVERED_SUCCESS:
      return { loading: false, success: true }
    case ORDER_TOGGLE_DELIVERED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
