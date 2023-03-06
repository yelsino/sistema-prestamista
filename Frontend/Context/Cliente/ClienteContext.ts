
import { createContext } from 'react'
import { IPedido, IRespuesta } from 'types-yola'
import { OrderAction } from './orderReducer'

interface PropsContext {
  orders: Array<IPedido>
  orderSuccess: IPedido | null
  dispatch: React.Dispatch<OrderAction>
  generarPedido: (pedido: IPedido) => Promise<IRespuesta<IPedido>>,
  obtenerPedidos: (usuario:string) => Promise<IRespuesta<Array<IPedido>>>
}

export const OrderContext = createContext<PropsContext>({} as PropsContext)
