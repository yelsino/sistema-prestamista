
import React, { createContext } from 'react'
import { ICliente, IClienteDetalle, IRespuesta, RegistroCliente } from 'types-prestamista'
import { ClienteState } from './ClienteProvider'
import { ClienteAction } from './clienteReducer'

interface PropsContext extends ClienteState {
  dispatch: React.Dispatch<ClienteAction>
  generarCliente: (cliente: RegistroCliente) => Promise<IRespuesta<ICliente>>,
  obtenerClientes: () => Promise<IRespuesta<ICliente[]>>
  obtenerDetalleCliente: (cliente: string) => Promise<IRespuesta<IClienteDetalle>>
  actualizarCliente: (cliente: RegistroCliente) => Promise<IRespuesta<ICliente>>
  obtenerCliente: (id: string) => Promise<IRespuesta<ICliente>>
  buscarClientes: (termino:string) => Promise<IRespuesta<ICliente[]>>
}

export const ClienteContext = createContext<PropsContext>({} as PropsContext)
