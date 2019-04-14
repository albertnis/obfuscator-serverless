import { InputState, AnyInputAction, CHANGE_TEXT, CHANGE_LANGUAGES } from './types'

const initialState: InputState = {
  text: 'initial low level',
  languages: [
    { name: "English", code: "en" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" }
  ]
}

export const inputReducer = (state: InputState = initialState, action: AnyInputAction): InputState => {
  switch (action.type) {
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.payload
      }
    case CHANGE_LANGUAGES:
      return {
        ...state,
        languages: [
          ...state.languages.slice(0, action.payload.index),
          action.payload.newLanguage,
          ...state.languages.slice(action.payload.index + 1)
        ]
      }
    default:
      return state
  }
}
