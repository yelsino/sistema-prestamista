import { ICliente } from 'types-prestamista'
import { ClienteState } from './PrestamoProvider'

export type ClienteAction =
  | { type: 'GET_CLIENTES'; payload: Array<ICliente> }
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
    case 'SELECT_CLIENTE':
      return {
        ...state,
        cliente: action.payload
      }

    default:
      return state
  }
}
