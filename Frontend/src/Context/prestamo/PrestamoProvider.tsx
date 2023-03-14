import React, { useReducer } from 'react'
import { ICuota, IPrestamo, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { PrestamoContext } from './PrestamoContext'
import { prestamoReducer } from './prestamoReducer'

export interface PrestamoState {
  prestamo: IPrestamo
  contrato: IPrestamo[]
  prestamos: IPrestamo[]
  cuotas: ICuota[]
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: PrestamoState = {
  prestamo: null,
  contrato: [],
  prestamos: [],
  cuotas: []

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
      type: 'GET_PRESTAMOS'
    })

    return respuesta
  }
  const obtenerPrestamo = async (id:string):Promise<IRespuesta<IPrestamo>> => {
    const respuesta = await fetchConToken<IRespuesta<IPrestamo>>({
      endpoint: 'prestamos/' + id,
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
  const obtenerCuotas = async (prestamo):Promise<IRespuesta<ICuota[]>> => {
    const respuesta = await fetchConToken<IRespuesta<ICuota[]>>({
      endpoint: 'prestamos/cuotas/' + prestamo,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_CUOTA'
    })

    return respuesta
  }
  const pagarCuotas = async (cuotas:ICuota[]):Promise<IRespuesta<ICuota[]>> => {
    const respuesta = await fetchConToken<IRespuesta<ICuota[]>>({
      endpoint: 'prestamos/pagar-cuotas',
      method: 'POST',
      body: cuotas
    })

    await obtenerCuotas(cuotas[0].prestamo)

    return respuesta
  }

  const cancelarPago = async (cuota:ICuota):Promise<IRespuesta<ICuota>> => {
    const respuesta = await fetchConToken<IRespuesta<ICuota>>({
      endpoint: 'prestamos/cancelar-pago',
      method: 'POST',
      body: cuota
    })

    await obtenerCuotas(cuota.prestamo)

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
        pagarCuotas,
        obtenerPrestamo,
        cancelarPago
      }}
    >
      {children}
    </PrestamoContext.Provider>
  )
}
