
import React, { createContext } from 'react'
import { IAuth, IAuthRest, IRespuesta } from 'types-prestamista'
import { AuthState } from './AuthProvider'
import { AuthAction } from './authReducer'

interface PropsContext extends AuthState {
  userLogin: (data:IAuth) => Promise<IRespuesta<IAuthRest>>
  registrarConEmail: (data:IAuth) => Promise<IRespuesta<IAuthRest>>
  verificarToken: () => Promise<boolean>
  userLogout: () => void
  dispatch: React.Dispatch<AuthAction>
}

export const AuthContext = createContext<PropsContext>(
  {} as PropsContext
)
