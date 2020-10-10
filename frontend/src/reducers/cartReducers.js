import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const existingItem = state.cartItems.find((i) => i.product === item.product)

      if (existingItem) {
        return { ...state, cartItems: state.cartItems.map((i) => (i.product == existingItem.product ? item : i)) }
      } else {
        return { ...state, cartItems: [...state.cartItems, item] }
      }
    case CART_REMOVE_ITEM:
      return {}
    default:
      return state
  }
}
