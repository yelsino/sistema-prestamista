import React, { useReducer } from 'react'
import { IMoneda, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { MonedaContext } from './MonedaContext'
import { monedaReducer } from './monedaReducer'

export interface MonedaState {
  moneda: IMoneda
  monedas: IMoneda[]
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: MonedaState = {
  moneda: null,
  monedas: []
}

export const MonedaProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(monedaReducer, INITIAL_STATE)

  const generarMoneda = async (Monedas: IMoneda): Promise<IRespuesta<IMoneda>> => {
    const respuesta = await fetchConToken<IRespuesta<IMoneda>>({
      endpoint: 'monedas/registrar',
      method: 'POST',
      body: Monedas
    })

    return respuesta
  }

  const obtenerMoneda = async ():Promise<IRespuesta<IMoneda[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IMoneda[]>>({
      endpoint: 'monedas',
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_MONEDA'
    })

    return respuesta
  }

  return (
    <MonedaContext.Provider
      value={{
        ...state,
        dispatch,
        generarMoneda,
        obtenerMoneda
      }}
    >
      {children}
    </MonedaContext.Provider>
  )
}
