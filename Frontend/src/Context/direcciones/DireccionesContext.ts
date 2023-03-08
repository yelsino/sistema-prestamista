
import React, { createContext } from 'react'
import { IDireccion, IRespuesta } from 'types-prestamista'
import { DireccionAction } from './direccionesReducer'

interface PropsContext {
  cliente: IDireccion | null
  clientes: IDireccion[]
  dispatch: React.Dispatch<DireccionAction>
  generarDirecciones: (direcciones: IDireccion) => Promise<IRespuesta<IDireccion>>,
  obtenerDirecciones: (idUsuario) => Promise<IRespuesta<Array<IDireccion>>>,
  obtenerDepartamentos: () => Promise<IRespuesta<Array<IDireccion>>>,
  obtenerProvincias: (idDepartamento) => Promise<IRespuesta<Array<IDireccion>>>,
  obtenerDistritos: (idProvincia) => Promise<IRespuesta<Array<IDireccion>>>
}

export const DireccionesContext = createContext<PropsContext>({} as PropsContext)
