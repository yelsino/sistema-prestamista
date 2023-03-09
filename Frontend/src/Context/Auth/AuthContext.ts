
import React, { createContext } from 'react'
import { IRespuesta } from 'types-prestamista'
import { IAuth, IAuthRest } from 'types-prestamista/dist/interfaces/usuario.interface'
import { AuthState } from './AuthProvider'
import { AuthAction } from './authReducer'

interface AuthContextProps extends AuthState {
  userLogin: (data:IAuth) => Promise<IRespuesta<IAuthRest>>
  registrarConEmail: (data:IAuth) => Promise<IRespuesta<IAuthRest>>
  verificarToken: () => Promise<boolean>
  userLogout: () => void
  dispatch: React.Dispatch<AuthAction>
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)
