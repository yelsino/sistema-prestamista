import { IUsuario } from 'types-prestamista'
import { UsuarioState } from './UsuariosProvider'

export type UsuarioAction =
  | { type: 'GET_USUARIOS'; payload: IUsuario[] }
  | { type: 'SELECT_USUARIO'; payload: IUsuario }

export const clienteReducer = (
  state: UsuarioState,
  action: UsuarioAction
): UsuarioState => {
  switch (action.type) {
    case 'GET_USUARIOS':
      return {
        ...state,
        usuarios: action.payload
      }
    case 'SELECT_USUARIO':
      return {
        ...state,
        usuario: action.payload
      }

    default:
      return state
  }
}
