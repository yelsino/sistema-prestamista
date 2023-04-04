import { InterfazState } from './InterfazProvider'

export type InterfazAction =
  | { type: 'SHOW_SIDEBAR'; payload: boolean }

export const interfazReducer = (
  state: InterfazState,
  action: InterfazAction
): InterfazState => {
  switch (action.type) {
    case 'SHOW_SIDEBAR':
      return {
        ...state,
        sidebar: action.payload
      }

    default:
      return state
  }
}
