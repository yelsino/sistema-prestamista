import { IPrestamo } from 'types-prestamista'
import { PrestamoState } from './PrestamoProvider'

export type PrestamoAction =
  | { type: 'GET_PRESTAMO'; payload: IPrestamo[] }
  | { type: 'SELECT_PRESTAMO'; payload: IPrestamo }

export const prestamoReducer = (
  state: PrestamoState,
  action: PrestamoAction
): PrestamoState => {
  switch (action.type) {
    case 'GET_PRESTAMO':
      return {
        ...state,
        prestamos: action.payload
      }
    case 'SELECT_PRESTAMO':
      return {
        ...state,
        prestamo: action.payload
      }

    default:
      return state
  }
}
