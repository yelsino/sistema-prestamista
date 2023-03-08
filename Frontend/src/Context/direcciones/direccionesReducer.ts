import { IDireccion } from 'types-prestamista'
import { DireccionState } from './DireccionesProvider'

export type DireccionAction =
  | { type: 'GET_DIRECCION'; payload: Array<IDireccion> }
  | { type: 'GET_DEPARTAMENTO'; payload: Array<IDireccion> }
  | { type: 'GET_PROVINCIA'; payload: Array<IDireccion> }
  | { type: 'GET_DISTRITO'; payload: Array<IDireccion> }

export const direccionesReducer = (
  state: DireccionState,
  action: DireccionAction
): DireccionState => {
  switch (action.type) {
    case 'GET_DIRECCION':
      return {
        ...state,
        direcciones: action.payload
      }
    case 'GET_DEPARTAMENTO':
      return {
        ...state,
        direcciones: action.payload
      }
    case 'GET_PROVINCIA':
      return {
        ...state,
        direcciones: action.payload
      }
    case 'GET_DISTRITO':
      return {
        ...state,
        direcciones: action.payload
      }

    default:
      return state
  }
}
