
import React, { createContext } from 'react'
import { ICliente, IRespuesta, RegistroCliente } from 'types-prestamista'
import { ClienteAction } from './clienteReducer'

interface PropsContext {
  cliente: ICliente | null
  clientes: ICliente[]
  detalleCliente: ICliente[]
  buscarCliente: ICliente[]
  dispatch: React.Dispatch<ClienteAction>
  generarCliente: (cliente: RegistroCliente) => Promise<IRespuesta<ICliente>>,
  obtenerClientes: () => Promise<IRespuesta<ICliente[]>>
  buscarClientes: (Texto) => Promise<IRespuesta<ICliente[]>>
  obtenerDetalleCliente: (ICliente) => Promise<IRespuesta<ICliente[]>>
}

export const ClienteContext = createContext<PropsContext>({} as PropsContext)
