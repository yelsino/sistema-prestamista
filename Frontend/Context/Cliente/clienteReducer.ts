
import { IPedido } from 'types-yola';
import { OrderState } from './OrderProvider'

export type OrderAction = 
  | { type: 'GET_USER_ORDERS'; payload: Array<IPedido> }
  | { type: 'ADD_ORDER'; payload: IPedido }
  | { type: 'ORDER_SUCCESS'; payload: IPedido }

export const orderReducer = (
  state: OrderState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case 'GET_USER_ORDERS':
      return {
        ...state,
        orders: action.payload
      }
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload]
      }
    case 'ORDER_SUCCESS':
      return {
        ...state,
        orderSuccess: action.payload
      }

    default:
      return state
  }
}
