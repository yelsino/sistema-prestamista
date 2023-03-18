import React, { useReducer } from 'react'
import { ICliente, IClienteDetalle, IRespuesta, RegistroCliente } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { ClienteContext } from './ClienteContext'
import { clienteReducer } from './clienteReducer'

export interface ClienteState {
  cliente: ICliente
  clienteDetalle: IClienteDetalle
  clientes: ICliente[]
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: ClienteState = {
  cliente: null,
  clienteDetalle: null,
  clientes: []
}

export const ClienteProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(clienteReducer, INITIAL_STATE)

  const generarCliente = async (cliente: RegistroCliente): Promise<IRespuesta<ICliente>> => {
    const respuesta = await fetchConToken<IRespuesta<ICliente>>({
      endpoint: 'clientes/registrar',
      method: 'POST',
      body: cliente
    })

    return respuesta
  }

  const obtenerClientes = async ():Promise<IRespuesta<Array<ICliente>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<ICliente>>>({
      endpoint: 'clientes',
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_CLIENTES'
    })

    return respuesta
  }

  const obtenerCliente = async (idCliente: string):Promise<IRespuesta<ICliente>> => {
    const respuesta = await fetchConToken<IRespuesta<ICliente>>({
      endpoint: 'clientes/' + idCliente,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'SELECT_CLIENTE'
    })

    return respuesta
  }

  const buscarClientes = async (termino):Promise<IRespuesta<ICliente[]>> => {
    const respuesta = await fetchConToken<IRespuesta<ICliente[]>>({
      endpoint: 'clientes/buscar/' + termino,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_CLIENTES'
    })

    dispatch({
      payload: respuesta.data[0],
      type: 'SELECT_CLIENTE'
    })

    return respuesta
  }

  const obtenerDetalleCliente = async (cliente: string):Promise<IRespuesta<IClienteDetalle>> => {
    const respuesta = await fetchConToken<IRespuesta<IClienteDetalle>>({
      endpoint: 'clientes/detalle/' + cliente,
      method: 'GET'
    })

    if (!respuesta.ok) return

    dispatch({
      payload: respuesta.data,
      type: 'GET_CLIENTE_DETALLE'
    })

    return respuesta
  }

  const actualizarCliente = async (cliente: RegistroCliente): Promise<IRespuesta<ICliente>> => {
    const respuesta = await fetchConToken<IRespuesta<ICliente>>({
      endpoint: 'clientes/actualizar/' + cliente._id,
      method: 'PUT',
      body: cliente
    })

    if (!respuesta.ok) return

    await obtenerDetalleCliente(cliente._id)

    return respuesta
  }

  return (
    <ClienteContext.Provider
      value={{
        ...state,
        dispatch,
        generarCliente,
        obtenerClientes,
        obtenerCliente,
        obtenerDetalleCliente,
        buscarClientes,
        actualizarCliente
      }}
    >
      {children}
    </ClienteContext.Provider>
  )
}
