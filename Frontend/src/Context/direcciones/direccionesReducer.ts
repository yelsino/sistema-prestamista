import { IDireccion } from 'types-prestamista'
import { DireccionesState } from './DireccionesProvider'

export type ClienteAction =
  | { type: 'GET_CLIENTES'; payload: Array<IDireccion> }
  | { type: 'SELECT_CLIENTE'; payload: IDireccion }

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
