
import React, { createContext } from 'react'
import { ICuota, IPrestamo, IRespuesta } from 'types-prestamista'
import { PrestamoAction } from './prestamoReducer'

interface PropsContext {
  prestamo: IPrestamo | null,
  contrato: IPrestamo [],
  prestamos: IPrestamo[],
  buscarPrestamos:IPrestamo[],
  detallePrestamo:IPrestamo[],
  cuota:IPrestamo[],
  pagarCuota:ICuota[],
  dispatch: React.Dispatch<PrestamoAction>
  generarPrestamo: (prestamo: IPrestamo) => Promise<IRespuesta<IPrestamo>>,
  obtenerPrestamos: () => Promise<IRespuesta<IPrestamo[]>>
  obtenerDetallePrestamo: (IPrestamo) => Promise<IRespuesta<IPrestamo[]>>
  buscarPrestamo: (Texto) => Promise<IRespuesta<IPrestamo[]>>
  obtenerContrato: () => Promise<IRespuesta<IPrestamo[]>>
  obtenerCuotas: (IPrestamo) => Promise<IRespuesta<IPrestamo[]>>
  pagarCuotas: (ICuota) => Promise<IRespuesta<ICuota[]>>
}

export const PrestamoContext = createContext<PropsContext>({} as PropsContext)
