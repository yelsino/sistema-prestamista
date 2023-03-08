import React, { useReducer } from 'react'
import { IPrestamo, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { PrestamoContext } from './PrestamoContext'
import { prestamoReducer } from './prestamoReducer'

export interface PrestamoState {
  prestamo: IPrestamo
  prestamos: IPrestamo[]
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: PrestamoState = {
  prestamo: null,
  prestamos: []
}

export const PrestamoProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(prestamoReducer, INITIAL_STATE)

  const generarPrestamo = async (prestamo: IPrestamo): Promise<IRespuesta<IPrestamo>> => {
    const respuesta = await fetchConToken<IRespuesta<IPrestamo>>({
      endpoint: 'prestamos/nuevo',
      method: 'POST',
      body: prestamo
    })

    return respuesta
  }

  const obtenerPrestamo = async ():Promise<IRespuesta<IPrestamo[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IPrestamo[]>>({
      endpoint: 'prestamos',
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_PRESTAMO'
    })

    return respuesta
  }

  return (
    <PrestamoContext.Provider
      value={{
        ...state,
        dispatch,
        generarPrestamo,
        obtenerPrestamo
      }}
    >
      {children}
    </PrestamoContext.Provider>
  )
}
