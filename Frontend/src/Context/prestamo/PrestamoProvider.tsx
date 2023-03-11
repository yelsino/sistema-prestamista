import React, { useReducer } from 'react'
import { ICuota, IPrestamo, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { PrestamoContext } from './PrestamoContext'
import { prestamoReducer } from './prestamoReducer'

export interface PrestamoState {
  prestamo: IPrestamo
  contrato: IPrestamo[]
  prestamos: IPrestamo[]
  detallePrestamo:IPrestamo[]
  buscarPrestamos:IPrestamo[]
  cuota: IPrestamo[]
  pagarCuota: ICuota[]
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: PrestamoState = {
  prestamo: null,
  contrato: [],
  prestamos: [],
  detallePrestamo: [],
  buscarPrestamos: [],
  cuota: [],
  pagarCuota: []

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

  const obtenerPrestamos = async ():Promise<IRespuesta<IPrestamo[]>> => {
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

  const obtenerDetallePrestamo = async (IPrestamo):Promise<IRespuesta<IPrestamo[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IPrestamo[]>>({
      endpoint: 'prestamos/' + IPrestamo,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_DETALLE'
    })

    return respuesta
  }

  const buscarPrestamo = async (Texto):Promise<IRespuesta<IPrestamo[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IPrestamo[]>>({
      endpoint: 'prestamos/buscar' + Texto,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_BUSCAR'
    })

    return respuesta
  }
  const obtenerContrato = async ():Promise<IRespuesta<IPrestamo[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IPrestamo[]>>({
      endpoint: 'prestamos/obtener-contratos',
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_CONTRATO'
    })

    return respuesta
  }
  const obtenerCuotas = async (IPrestamo):Promise<IRespuesta<IPrestamo[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IPrestamo[]>>({
      endpoint: 'prestamos/cuotas/' + IPrestamo,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_CUOTA'
    })

    return respuesta
  }
  const pagarCuotas = async (ICuota):Promise<IRespuesta<ICuota[]>> => {
    const respuesta = await fetchConToken<IRespuesta<ICuota[]>>({
      endpoint: 'prestamos/cuotas/' + ICuota,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_PAGAR'
    })

    return respuesta
  }

  return (
    <PrestamoContext.Provider
      value={{
        ...state,
        dispatch,
        generarPrestamo,
        obtenerPrestamos,
        obtenerDetallePrestamo,
        buscarPrestamo,
        obtenerContrato,
        obtenerCuotas,
        pagarCuotas
      }}
    >
      {children}
    </PrestamoContext.Provider>
  )
}
