
import React, { createContext } from 'react'
import { IDepartamento, IDireccion, IDistrito, IProvincia, IRespuesta } from 'types-prestamista'
import { DireccionAction } from './direccionReducer'

interface PropsContext {
  departamentos: IDepartamento[]
  provincias: IProvincia[]
  distritos: IDistrito[]
  direccion: IDireccion | null
  direcciones: IDireccion[]
  dispatch: React.Dispatch<DireccionAction>
  generarDirecciones: (direcciones: IDireccion) => Promise<IRespuesta<IDireccion[]>>,
  obtenerDirecciones: (idUsuario) => Promise<IRespuesta<IDireccion[]>>,
  obtenerDepartamentos: () => Promise<IRespuesta<IDepartamento[]>>,
  obtenerProvincias: (idDepartamento) => Promise<IRespuesta<IProvincia[]>>,
  obtenerDistritos: (idProvincia) => Promise<IRespuesta<IDistrito[]>>
}

export const DireccionContext = createContext<PropsContext>({} as PropsContext)
