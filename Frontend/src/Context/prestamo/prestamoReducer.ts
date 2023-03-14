import { ICuota, IFormasPago, IPrestamo } from 'types-prestamista'
import { PrestamoState } from './PrestamoProvider'

export type PrestamoAction =
  | { type: 'GET_PRESTAMOS'; payload: IPrestamo[] }
  | { type: 'GET_PRESTAMO'; payload: IPrestamo }
  | { type: 'GET_BUSCAR'; payload: IPrestamo[] }
  | { type: 'GET_DETALLE'; payload: IPrestamo[] }
  | { type: 'GET_CONTRATO'; payload: IPrestamo[] }
  | { type: 'GET_CUOTA'; payload: ICuota[] }
  | { type: 'PAGAR_CUOTAS'; payload: ICuota[] }
  | { type: 'SELECT_PRESTAMO'; payload: IPrestamo }
  | { type: 'GET_FORMAS_PAGO'; payload: IFormasPago[] }

export const prestamoReducer = (
  state: PrestamoState,
  action: PrestamoAction
): PrestamoState => {
  switch (action.type) {
    case 'GET_PRESTAMOS':
      return {
        ...state,
        prestamos: action.payload
      }
    case 'GET_PRESTAMO':
      return {
        ...state,
        prestamo: action.payload
      }
    case 'GET_BUSCAR':
      return {
        ...state
      }
    case 'GET_DETALLE':
      return {
        ...state
      }
    case 'GET_CONTRATO':
      return {
        ...state,
        contrato: action.payload
      }
    case 'GET_CUOTA':
      return {
        ...state,
        cuotas: action.payload
      }
    case 'PAGAR_CUOTAS':{
      return {
        ...state,
        cuotas: action.payload
      }
    }

    case 'SELECT_PRESTAMO':
      return {
        ...state,
        prestamo: action.payload
      }
    case 'GET_FORMAS_PAGO':
      return {
        ...state,
        formasPago: action.payload
      }
    default:
      return state
  }
}
