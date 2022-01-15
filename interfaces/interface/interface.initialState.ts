import { ACTION_TYPE } from "../enum/enum.action";

export interface InitialState {
  count: number
}

export interface ActionReducer {
  type: ACTION_TYPE,
  payload: number
}