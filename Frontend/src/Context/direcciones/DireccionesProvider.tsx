import React, { useReducer } from 'react'
import { IDirecciones, IRespuesta } from 'types-prestamista'
import { fetchConToken } from '../../helpers/fetch'
import { DireccionesContext } from './DireccionesContext'
import { direccionesReducer } from './direccionesReducer'

export interface DireccionesState {
  direccion: IDirecciones
  direcciones: Array<IDirecciones>
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: DireccionesState = {
  direccion: null,
  direcciones: []
}

export const DireccionesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(direccionesReducer, INITIAL_STATE)

  const generarDirecciones = async (direcciones: IDirecciones): Promise<IRespuesta<IDirecciones>> => {
    const respuesta = await fetchConToken<IRespuesta<IDirecciones>>({
      endpoint: 'direcciones',
      method: 'POST',
      body: direcciones
    })

    return respuesta
  }

  const obtenerDirecciones = async (idUsuario):Promise<IRespuesta<Array<IDirecciones>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IDirecciones>>>({
      endpoint: 'direcciones/de-usuario/' + idUsuario,
      method: 'GET'
    })

    console.log(respuesta)

    return respuesta
  }
  const obtenerDepartamentos = async ():Promise<IRespuesta<Array<IDirecciones>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IDirecciones>>>({
      endpoint: 'direcciones/departamentos',
      method: 'GET'
    })

    console.log(respuesta)

    return respuesta
  }
  const obtenerProvincia = async (idDepartamento):Promise<IRespuesta<Array<IDirecciones>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IDirecciones>>>({
      endpoint: 'direcciones/provincias/' + idDepartamento,
      method: 'GET'
    })

    console.log(respuesta)

    return respuesta
  }
  const obtenerDistrito = async (idProvincia):Promise<IRespuesta<Array<IDirecciones>>> => {
    const respuesta = await fetchConToken<IRespuesta<Array<IDirecciones>>>({
      endpoint: 'direcciones/distritos/' + idProvincia,
      method: 'GET'
    })

    console.log(respuesta)

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
        obtenerProvincia,
        obtenerDistrito
      }}
    >
      {children}
    </DireccionesContext.Provider>
  )
}
