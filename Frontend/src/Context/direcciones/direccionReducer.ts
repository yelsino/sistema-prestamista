import { IDepartamento, IDireccion, IDistrito, IProvincia } from 'types-prestamista'
import { DireccionState } from './DireccionProvider'

export type DireccionAction =
  | { type: 'SELECT_DIRECTION'; payload: IDireccion }
  | { type: 'GET_DIRECCIONES'; payload: IDireccion[] }
  | { type: 'GET_DEPARTAMENTO'; payload: IDepartamento[] }
  | { type: 'GET_PROVINCIA'; payload: IProvincia[] }
  | { type: 'GET_DISTRITO'; payload: IDistrito[] }

export const direccionesReducer = (
  state: DireccionState,
  action: DireccionAction
): DireccionState => {
  switch (action.type) {
    case 'SELECT_DIRECTION':
      return {
        ...state,
        direccion: action.payload
      }
    case 'GET_DIRECCIONES':
      return {
        ...state,
        direcciones: action.payload
      }
    case 'GET_DEPARTAMENTO':
      return {
        ...state,
        departamentos: action.payload
      }
    case 'GET_PROVINCIA':
      return {
        ...state,
        provincias: action.payload
      }
    case 'GET_DISTRITO':
      return {
        ...state,
        distritos: action.payload
      }

    default:
      return state
  }
}
