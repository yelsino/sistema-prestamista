
import React, { createContext } from 'react'
import { IMoneda, IRespuesta } from 'types-prestamista'
import { MonedaAction } from './monedaReducer'

interface PropsContext {
  moneda: IMoneda | null
  monedas: IMoneda[]
  dispatch: React.Dispatch<MonedaAction>
  generarMoneda: (Monedas: IMoneda) => Promise<IRespuesta<IMoneda>>,
  obtenerMoneda: () => Promise<IRespuesta<IMoneda[]>>
}

export const MonedaContext = createContext<PropsContext>({} as PropsContext)
