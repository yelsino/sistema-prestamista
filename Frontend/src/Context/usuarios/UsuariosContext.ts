
import React, { createContext } from 'react'
import { ICliente, IRespuesta } from 'types-prestamista'
import { ClienteAction } from './usuariosReducer'

interface PropsContext {
  cliente: ICliente | null
  clientes: ICliente[]
  dispatch: React.Dispatch<ClienteAction>
  generarCliente: (cliente: ICliente) => Promise<IRespuesta<ICliente>>,
  obtenerClientes: () => Promise<IRespuesta<Array<ICliente>>>
}

export const ClienteContext = createContext<PropsContext>({} as PropsContext)
