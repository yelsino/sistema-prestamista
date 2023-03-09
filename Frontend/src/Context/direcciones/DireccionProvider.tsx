import React, { useReducer } from 'react'
import { IDepartamento, IDireccion, IDistrito, IProvincia, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { DireccionContext } from './DireccionContext'
import { direccionesReducer } from './direccionReducer'

export interface DireccionState {
  departamentos: IDepartamento[],
  provincias: IProvincia[],
  distritos: IDistrito[],
  direccion: IDireccion
  direcciones: IDireccion[]
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: DireccionState = {
  departamentos: [],
  provincias: [],
  distritos: [],
  direccion: null,
  direcciones: []
}

// interface PropsContext {
//   departamentos: IDepartamento[]
//   provincias: IProvincia[]
//   distritos: IDistrito[]
//   direccion: IDireccion | null
//   direcciones: IDireccion[]
//   dispatch: React.Dispatch<DireccionAction>

//   generarDirecciones: (direcciones: IDireccion) => Promise<IRespuesta<IDireccion[]>>,
//   obtenerDirecciones: (idUsuario) => Promise<IRespuesta<Array<IDireccion[]>>>,
//   obtenerDepartamentos: () => Promise<IRespuesta<Array<IDepartamento[]>>>,
//   obtenerProvincias: (idDepartamento) => Promise<IRespuesta<Array<IProvincia[]>>>,
//   obtenerDistritos: (idProvincia) => Promise<IRespuesta<Array<IDistrito[]>>>
// }

export const DireccionProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(direccionesReducer, INITIAL_STATE)

  const generarDirecciones = async (direcciones: IDireccion): Promise<IRespuesta<IDireccion[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IDireccion[]>>({
      endpoint: 'direcciones',
      method: 'POST',
      body: direcciones
    })

    return respuesta
  }

  const obtenerDirecciones = async (idUsuario):Promise<IRespuesta<IDireccion[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IDireccion[]>>({
      endpoint: 'direcciones/de-usuario/' + idUsuario,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_DIRECCIONES'
    })

    return respuesta
  }
  const obtenerDepartamentos = async ():Promise<IRespuesta<IDepartamento[]>> => {
    const respuesta = await fetchConToken<IRespuesta<IDepartamento[]>>({
      endpoint: 'direcciones/departamentos',
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_DEPARTAMENTO'
    })

    return respuesta
  }
  const obtenerProvincias = async (idDepartamento):Promise<IRespuesta<Array<IProvincia>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IProvincia>>>({
      endpoint: 'direcciones/provincias/' + idDepartamento,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_PROVINCIA'
    })

    return respuesta
  }
  const obtenerDistritos = async (idProvincia):Promise<IRespuesta<Array<IDistrito>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IDistrito>>>({
      endpoint: 'direcciones/distritos/' + idProvincia,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_DISTRITO'
    })

    return respuesta
  }

  return (
    <DireccionContext.Provider
      value={{
        ...state,
        dispatch,
        generarDirecciones,
        obtenerDirecciones,
        obtenerDepartamentos,
        obtenerProvincias,
        obtenerDistritos
      }}
    >
      {children}
    </DireccionContext.Provider>
  )
}
