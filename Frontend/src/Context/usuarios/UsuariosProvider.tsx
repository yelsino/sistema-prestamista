import React, { useReducer } from 'react'
import { IUsuario, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { UsuariosContext } from './UsuariosContext'
import { usuariosReducer } from './usuariosReducer'

export interface UsuarioState {
  usuario: IUsuario
  usuarios: Array<IUsuario>
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: UsuarioState = {
  usuario: null,
  usuarios: []
}

export const UsuariosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(usuariosReducer, INITIAL_STATE)

  const generarUsuario = async (usuario: IUsuario): Promise<IRespuesta<IUsuario>> => {
    const respuesta = await fetchConToken<IRespuesta<IUsuario>>({
      endpoint: 'usuarios/nuevo',
      method: 'POST',
      body: usuario
    })

    return respuesta
  }

  const obtenerUsuario = async ():Promise<IRespuesta<Array<IUsuario>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IUsuario>>>({
      endpoint: 'usuarios',
      method: 'GET'
    })

    console.log(respuesta)

    return respuesta
  }

  return (
    <UsuariosContext.Provider
      value={{
        ...state,
        dispatch,
        generarUsuario,
        obtenerUsuario
      }}
    >
      {children}
    </UsuariosContext.Provider>
  )
}
