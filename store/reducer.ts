import { ACTION_TYPE } from "../interfaces/enum/enum.action"
import { ActionReducer, InitialState } from "../interfaces/interface/interface.initialState"

const reducer = (state: InitialState, action: ActionReducer) => {
  switch (action.type) {
    case ACTION_TYPE.SET_COUNT:
      return { ...state, count: action.payload }
    default:
      return state
  }
}

export default reducer