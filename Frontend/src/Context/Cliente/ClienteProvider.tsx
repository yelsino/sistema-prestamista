import React, { useReducer } from 'react'
import { ICliente, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { ClienteContext } from './ClienteContext'
import { clienteReducer } from './clienteReducer'

export interface ClienteState {
  cliente: ICliente
  clientes: Array<ICliente>
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: ClienteState = {
  cliente: null,
  clientes: []
}

export const ClienteProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(clienteReducer, INITIAL_STATE)

  const generarCliente = async (cliente: ICliente): Promise<IRespuesta<ICliente>> => {
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

  return (
    <ClienteContext.Provider
      value={{
        ...state,
        dispatch,
        generarCliente,
        obtenerClientes
      }}
    >
      {children}
    </ClienteContext.Provider>
  )
}
