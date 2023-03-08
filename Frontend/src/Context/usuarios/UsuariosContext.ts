
import React, { createContext } from 'react'
import { IRespuesta, IUsuario } from 'types-prestamista'
import { UsuarioAction } from './usuariosReducer'

interface PropsContext {
  usuario: IUsuario | null
  usuarios: IUsuario[]
  dispatch: React.Dispatch<UsuarioAction>
  generarUsuario: (usuario: IUsuario) => Promise<IRespuesta<IUsuario>>,
  obtenerUsuario: () => Promise<IRespuesta<IUsuario[]>>
}

export const UsuarioContext = createContext<PropsContext>({} as PropsContext)
