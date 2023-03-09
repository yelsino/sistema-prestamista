import React, { useReducer } from 'react'
import { ICliente, IRespuesta, RegistroCliente } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { ClienteContext } from './ClienteContext'
import { clienteReducer } from './clienteReducer'

export interface ClienteState {
  cliente: ICliente
  clientes: ICliente[]
  detalleCliente: ICliente[]
  buscarCliente:ICliente[]
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: ClienteState = {
  cliente: null,
  clientes: [],
  detalleCliente: [],
  buscarCliente: []
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
  const obtenerDetalleCliente = async (ICliente):Promise<IRespuesta<ICliente[]>> => {
    const respuesta = await fetchConToken<IRespuesta<ICliente[]>>({
      endpoint: 'clientes/' + ICliente,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_DETALLE_CLIENTE'
    })

    return respuesta
  }
  const buscarClientes = async (Texto):Promise<IRespuesta<ICliente[]>> => {
    const respuesta = await fetchConToken<IRespuesta<ICliente[]>>({
      endpoint: 'clientes/buscar/' + Texto,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_BUSCAR'
    })

    return respuesta
  }

  return (
    <ClienteContext.Provider
      value={{
        ...state,
        dispatch,
        generarCliente,
        obtenerClientes,
        obtenerDetalleCliente,
        buscarClientes
      }}
    >
      {children}
    </ClienteContext.Provider>
  )
}
