import React, { createContext } from 'react'
import { InterfazState } from './InterfazProvider'
import { InterfazAction } from './interfazReducer'

interface PropsContext extends InterfazState {
  dispatchInterfaz: React.Dispatch<InterfazAction>
}

export const InterfazContext = createContext<PropsContext>({} as PropsContext)
