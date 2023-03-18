import { ICliente, IClienteDetalle } from 'types-prestamista'
import { ClienteState } from './ClienteProvider'

export type ClienteAction =
  | { type: 'GET_CLIENTES'; payload: ICliente[] }
  | { type: 'GET_DETALLE_CLIENTE'; payload: ICliente[] }
  | { type: 'GET_BUSCAR'; payload: ICliente[] }
  | { type: 'SELECT_CLIENTE'; payload: ICliente }
  | { type: 'GET_CLIENTE_DETALLE'; payload: IClienteDetalle }

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
        ...state
      }
    case 'GET_BUSCAR':
      return {
        ...state
      }
    case 'SELECT_CLIENTE':
      return {
        ...state,
        cliente: action.payload
      }
    case 'GET_CLIENTE_DETALLE':
      return {
        ...state,
        clienteDetalle: action.payload

      }

    default:
      return state
  }
}
