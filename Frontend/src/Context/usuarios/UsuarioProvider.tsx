import React, { useReducer } from 'react'
import { IUsuario, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { UsuarioContext } from './UsuarioContext'
import { usuarioReducer } from './usuarioReducer'

export interface UsuarioState {
  usuario: IUsuario
  usuarios: IUsuario[]
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: UsuarioState = {
  usuario: null,
  usuarios: []
}

export const UsuariosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(usuarioReducer, INITIAL_STATE)

  const generarUsuario = async (usuario: IUsuario): Promise<IRespuesta<IUsuario>> => {
    const respuesta = await fetchConToken<IRespuesta<IUsuario>>({
      endpoint: 'usuarios/nuevo',
      method: 'POST',
      body: usuario
    })

    return respuesta
  }

  const obtenerUsuarios = async ():Promise<IRespuesta<IUsuario[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IUsuario[]>>({
      endpoint: 'usuarios',
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_USUARIOS'
    })

    return respuesta
  }

  return (
    <UsuarioContext.Provider
      value={{
        ...state,
        dispatch,
        generarUsuario,
        obtenerUsuarios
      }}
    >
      {children}
    </UsuarioContext.Provider>
  )
}
