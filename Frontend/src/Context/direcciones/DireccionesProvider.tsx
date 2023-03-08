import React, { useReducer } from 'react'
import { IDireccion, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { DireccionesContext } from './DireccionesContext'
import { direccionesReducer } from './direccionesReducer'

export interface DireccionState {
  departamentos: IDireccion[],
  provincias: IDireccion[],
  distritos: IDireccion[],
  direccion: IDireccion
  direcciones: Array<IDireccion>
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

export const DireccionesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(direccionesReducer, INITIAL_STATE)

  const generarDirecciones = async (direcciones: IDireccion): Promise<IRespuesta<IDireccion>> => {
    const respuesta = await fetchConToken<IRespuesta<IDireccion>>({
      endpoint: 'direcciones',
      method: 'POST',
      body: direcciones
    })

    return respuesta
  }

  const obtenerDirecciones = async (idUsuario):Promise<IRespuesta<Array<IDireccion>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IDireccion>>>({
      endpoint: 'direcciones/de-usuario/' + idUsuario,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_DIRECCION'
    })

    return respuesta
  }
  const obtenerDepartamentos = async ():Promise<IRespuesta<Array<IDireccion>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IDireccion>>>({
      endpoint: 'direcciones/departamentos',
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_DEPARTAMENTO'
    })

    return respuesta
  }
  const obtenerProvincias = async (idDepartamento):Promise<IRespuesta<Array<IDireccion>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IDireccion>>>({
      endpoint: 'direcciones/provincias/' + idDepartamento,
      method: 'GET'
    })

    dispatch({
      payload: respuesta.data,
      type: 'GET_PROVINCIA'
    })

    return respuesta
  }
  const obtenerDistritos = async (idProvincia):Promise<IRespuesta<Array<IDireccion>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IDireccion>>>({
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
    <DireccionesContext.Provider
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
    </DireccionesContext.Provider>
  )
}
