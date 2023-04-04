import React, { useReducer } from 'react'
import { interfazReducer } from './interfazReducer'
import { InterfazContext } from './InterfazContext'

export interface InterfazState {
  sidebar: boolean,
}
interface Props {
  children: React.ReactNode
}

const INITIAL_STATE: InterfazState = {
  sidebar: false
}

export const InterfazProvider = ({ children }: Props) => {
  const [state, dispatchInterfaz] = useReducer(interfazReducer, INITIAL_STATE)

  return (
    <InterfazContext.Provider
      value={{
        ...state,
        dispatchInterfaz
      }}
    >
      {children}
    </InterfazContext.Provider>
  )
}
