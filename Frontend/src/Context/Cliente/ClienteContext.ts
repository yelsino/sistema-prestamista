
import React, { createContext } from 'react'
import { ICliente, IDireccion, IRespuesta } from 'types-prestamista'
import { ClienteAction } from './clienteReducer'

export interface RegistroCliente extends Partial<ICliente>, Partial<IDireccion> {
  nombreDireccion: string,
}

interface PropsContext {
  cliente: ICliente | null
  clientes: ICliente[]
  dispatch: React.Dispatch<ClienteAction>
  generarCliente: (cliente: RegistroCliente) => Promise<IRespuesta<ICliente>>,
  obtenerClientes: () => Promise<IRespuesta<Array<ICliente>>>
}

export const ClienteContext = createContext<PropsContext>({} as PropsContext)
