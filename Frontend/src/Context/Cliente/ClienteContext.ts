
import React, { createContext } from 'react'
import { ICliente, IRespuesta, RegistroCliente } from 'types-prestamista'
import { ClienteAction } from './clienteReducer'

interface PropsContext {
  cliente: ICliente | null
  clientes: ICliente[]
  dispatch: React.Dispatch<ClienteAction>
  generarCliente: (cliente: RegistroCliente) => Promise<IRespuesta<ICliente>>,
  obtenerClientes: () => Promise<IRespuesta<Array<ICliente>>>
}

export const ClienteContext = createContext<PropsContext>({} as PropsContext)
