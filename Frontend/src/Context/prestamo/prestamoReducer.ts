import { ICuota, IPrestamo } from 'types-prestamista'
import { PrestamoState } from './PrestamoProvider'

export type PrestamoAction =
  | { type: 'GET_PRESTAMO'; payload: IPrestamo[] }
  | { type: 'GET_BUSCAR'; payload: IPrestamo[] }
  | { type: 'GET_DETALLE'; payload: IPrestamo[] }
  | { type: 'GET_CONTRATO'; payload: IPrestamo[] }
  | { type: 'GET_CUOTA'; payload: IPrestamo[] }
  | { type: 'GET_PAGAR'; payload: ICuota[] }
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
    case 'GET_BUSCAR':
      return {
        ...state,
        buscarPrestamos: action.payload
      }
    case 'GET_DETALLE':
      return {
        ...state,
        detallePrestamo: action.payload
      }
    case 'GET_CONTRATO':
      return {
        ...state,
        contrato: action.payload
      }
    case 'GET_CUOTA':
      return {
        ...state,
        cuota: action.payload
      }
    case 'GET_PAGAR':
      return {
        ...state,
        pagarCuota: action.payload
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
