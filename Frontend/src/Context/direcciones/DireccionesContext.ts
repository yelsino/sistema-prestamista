
import React, { createContext } from 'react'
import { IDireccion, IRespuesta } from 'types-prestamista'
import { DireccionAction } from './direccionesReducer'

interface PropsContext {
  cliente: IDireccion | null
  clientes: ICliente[]
  dispatch: React.Dispatch<ClienteAction>
  generarCliente: (cliente: ICliente) => Promise<IRespuesta<ICliente>>,
  obtenerClientes: () => Promise<IRespuesta<Array<ICliente>>>
}

export const ClienteContext = createContext<PropsContext>({} as PropsContext)
