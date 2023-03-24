
import React, { createContext } from 'react'
import { ICuota, IFormasPago, IPrestamo, IRespuesta } from 'types-prestamista'
import { PrestamoState } from './PrestamoProvider'
import { PrestamoAction } from './prestamoReducer'

interface PropsContext extends PrestamoState {
  dispatch: React.Dispatch<PrestamoAction>
  generarPrestamo: (prestamo: IPrestamo) => Promise<IRespuesta<IPrestamo>>,
  obtenerPrestamos: () => Promise<IRespuesta<IPrestamo[]>>
  obtenerPrestamo: (id:string) => Promise<IRespuesta<IPrestamo>>
  obtenerDetallePrestamo: (IPrestamo) => Promise<IRespuesta<IPrestamo[]>>
  buscarPrestamo: (Texto) => Promise<IRespuesta<IPrestamo[]>>
  obtenerContrato: () => Promise<IRespuesta<IPrestamo[]>>
  obtenerCuotas: (prestamo:string) => Promise<IRespuesta<ICuota[]>>
  pagarCuotas: (cuotas:ICuota[]) => Promise<IRespuesta<ICuota[]>>,
  cancelarPago: (cuotas:ICuota) => Promise<IRespuesta<ICuota>>,
  obtenerFormasPago: () => Promise<IRespuesta<IFormasPago[]>>,
  generarContrato: () => any
}

export const PrestamoContext = createContext<PropsContext>({} as PropsContext)
