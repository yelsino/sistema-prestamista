import React, { useCallback, useReducer } from 'react'
import { IRespuesta, IUsuario } from 'types-prestamista'
import { IAuth, IAuthRest } from 'types-prestamista/dist/interfaces/usuario.interface'
import { fetchConToken, fetchSinToken } from '../../helpers/fetch'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

export interface AuthState {
  _id: string | null
  checking: boolean
  logged: boolean
  loading: boolean
  user: IUsuario | null
  directions: []
}

const INITIAL_STATE: AuthState = {
  _id: '',
  checking: true,
  logged: false,
  loading: false,
  user: null,
  directions: []
}

interface Props {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  const userLogin = async (data:IAuth): Promise<IRespuesta<IAuthRest>> => {
    dispatch({ type: 'LOADING', payload: true })

    const resp = await fetchSinToken<IRespuesta<IAuthRest>>({
      endpoint: 'auth/login',
      body: data,
      method: 'POST'
    }).finally(() => dispatch({ type: 'LOADING', payload: false }))

    if (resp.ok) {
      const { usuario, token } = resp.data

      localStorage.setItem('token', token)

      dispatch({
        type: 'LOGIN',
        payload: usuario
      })
      return resp
    }

    localStorage.setItem('noPassword', 'true')
    return resp
  }

  const registrarConEmail = async (data: IAuth): Promise<IRespuesta<IAuthRest>> => {
    const resp = await fetchSinToken<IRespuesta<IAuthRest>>({
      endpoint: 'auth/registro-correo',
      body: data,
      method: 'POST'
    })

    if (resp.ok) {
      const { data } = resp
      localStorage.setItem('token', data.token)
      dispatch({
        type: 'LOGIN',
        payload: data.usuario
      })
      return resp
    }
    localStorage.setItem('noPassword', 'true')
    return resp
  }

  const verificarToken = useCallback(async () => {
    const token = localStorage.getItem('token') || ''
    // si token no existe
    if (!token) {
      dispatch({ type: 'LOGOUT' })

      return false
    }

    const resp = await fetchConToken<IRespuesta<IAuthRest>>({ endpoint: 'auth/re-login' })
    // const { usuario } = resp;
    console.log(resp)

    if (!resp.ok) {
      localStorage.removeItem('token')
      window.location.reload()
      return false
    }

    if (resp.ok) {
      localStorage.setItem('token', resp.data.token)
      dispatch({
        type: 'LOGIN',
        payload: resp.data.usuario
      })
      return true
    } else {
      dispatch({ type: 'LOGOUT' })
      return false
    }
  }, [])

  const userLogout = () => {
    localStorage.removeItem('token')
    dispatch({
      type: 'LOGOUT'
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        userLogin,
        verificarToken,
        userLogout,
        registrarConEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
