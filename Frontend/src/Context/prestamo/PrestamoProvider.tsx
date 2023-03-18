import React, { useReducer } from 'react'
import { ICuota, IFormasPago, IPrestamo, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { PrestamoContext } from './PrestamoContext'
import { prestamoReducer } from './prestamoReducer'

export interface PrestamoState {
  prestamo: IPrestamo
  contrato: IPrestamo[]
  prestamos: IPrestamo[]
  cuotas: ICuota[]
  formasPago: IFormasPago[]
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: PrestamoState = {
  prestamo: null,
  contrato: [],
  prestamos: [],
  cuotas: [],
  formasPago: []

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
    if (!respuesta.ok) return
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

    if (!respuesta.ok) return
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

    if (!respuesta.ok) return
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
    if (!respuesta.ok) return
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

  const obtenerFormasPago = async ():Promise<IRespuesta<IFormasPago[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IFormasPago[]>>({
      endpoint: 'prestamos/formas-pago',
      method: 'GET'
    })

    if (!respuesta.ok) return

    dispatch({
      payload: respuesta.data,
      type: 'GET_FORMAS_PAGO'
    })

    return respuesta
  }

  const generarContrato = async () => {
    const respuesta = await fetchConToken({
      endpoint: 'prestamos/generar-contrato',
      method: 'POST',
      body: {}
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
        pagarCuotas,
        obtenerPrestamo,
        cancelarPago,
        obtenerFormasPago,
        generarContrato
      }}
    >
      {children}
    </PrestamoContext.Provider>
  )
}
