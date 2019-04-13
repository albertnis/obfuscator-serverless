import { InputState, AnyInputAction, CHANGE_TEXT } from './types'

const initialState: InputState = {
  text: 'initial'
}

export const inputReducer = (state: InputState = initialState, action: AnyInputAction): InputState => {
  switch (action.type) {
    case CHANGE_TEXT:
      return {
        text: action.payload
      }
    default:
      return state
  }
}
