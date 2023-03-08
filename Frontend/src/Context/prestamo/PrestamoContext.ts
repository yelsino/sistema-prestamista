
import React, { createContext } from 'react'
import { IPrestamo, IRespuesta } from 'types-prestamista'
import { PrestamoAction } from './prestamoReducer'

interface PropsContext {
  prestamo: IPrestamo | null,
  prestamos: IPrestamo[]
  dispatch: React.Dispatch<PrestamoAction>
  generarPrestamo: (prestamo: IPrestamo) => Promise<IRespuesta<IPrestamo>>,
  obtenerPrestamo: () => Promise<IRespuesta<IPrestamo[]>>
}

export const PrestamoContext = createContext<PropsContext>({} as PropsContext)
