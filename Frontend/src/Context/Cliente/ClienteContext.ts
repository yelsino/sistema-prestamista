
import React, { createContext } from 'react'
import { ICliente, IRespuesta, RegistroCliente } from 'types-prestamista'
import { ClienteState } from './ClienteProvider'
import { ClienteAction } from './clienteReducer'

interface PropsContext extends ClienteState {
  dispatch: React.Dispatch<ClienteAction>
  generarCliente: (cliente: RegistroCliente) => Promise<IRespuesta<ICliente>>,
  obtenerClientes: () => Promise<IRespuesta<ICliente[]>>
  buscarClientes: (termino:string) => Promise<IRespuesta<ICliente[]>>
  obtenerDetalleCliente: (ICliente) => Promise<IRespuesta<ICliente[]>>
}

export const ClienteContext = createContext<PropsContext>({} as PropsContext)
