import { IMoneda } from 'types-prestamista'
import { MonedaState } from './MonedaProvider'

export type MonedaAction =
  | { type: 'GET_MONEDA'; payload: IMoneda[] }
  | { type: 'SELECT_MONEDA'; payload: IMoneda }

export const monedaReducer = (
  state: MonedaState,
  action: MonedaAction
): MonedaState => {
  switch (action.type) {
    case 'GET_MONEDA':
      return {
        ...state,
        monedas: action.payload
      }
    case 'SELECT_MONEDA':
      return {
        ...state,
        moneda: action.payload
      }

    default:
      return state
  }
}
