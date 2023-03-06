import { useReducer } from 'react'
import { fetchConToken } from 'helpers/fetch'


export interface ClienteState {
  cliente: ICliente
  clientes: Array<ICliente>
}
interface Props {
  children: JSX.Element | JSX.Element[]
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
      body: cliente,
    });

    return respuesta
  }

  const obtenerClientes = async (usuario: string):Promise<IRespuesta<Array<ICliente>>>  => {
    const respuesta = await fetchConToken<IRespuesta<Array<ICliente>>>({
      endpoint: `clientes`,
      method: 'GET',
    });

    console.log(respuesta);
    

    return respuesta
  }

  return (
    <ClienteContext.Provider
      value={{
        ...state,
        dispatch,
        generarCliente,
        obtenerClientes,
      }}
    >
      {children}
    </ClienteContext.Provider>
  )
}

