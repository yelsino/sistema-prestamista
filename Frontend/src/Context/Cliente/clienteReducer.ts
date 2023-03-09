import { ICliente } from 'types-prestamista'
import { ClienteState } from './ClienteProvider'

export type ClienteAction =
  | { type: 'GET_CLIENTES'; payload: ICliente[] }
  | { type: 'GET_DETALLE_CLIENTE'; payload: ICliente[] }
  | { type: 'GET_BUSCAR'; payload: ICliente[] }
  | { type: 'SELECT_CLIENTE'; payload: ICliente }

export const clienteReducer = (
  state: ClienteState,
  action: ClienteAction
): ClienteState => {
  switch (action.type) {
    case 'GET_CLIENTES':
      return {
        ...state,
        clientes: action.payload
      }
    case 'GET_DETALLE_CLIENTE':
      return {
        ...state,
        detalleCliente: action.payload
      }
    case 'GET_BUSCAR':
      return {
        ...state,
        buscarCliente: action.payload
      }
    case 'SELECT_CLIENTE':
      return {
        ...state,
        cliente: action.payload
      }

    default:
      return state
  }
}
