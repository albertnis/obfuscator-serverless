import { InputState, AnyInputAction, CHANGE_TEXT, CHANGE_LANGUAGES } from './types'
import { ValidLanguageCode } from '../../../types';

const initialState: InputState = {
  text: 'quality assurance testing is dank',
  languages: [ValidLanguageCode.en, ValidLanguageCode.zh, ValidLanguageCode.ru, ValidLanguageCode.he]
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
          action.payload.newLanguageCode,
          ...state.languages.slice(action.payload.index + 1)
        ]
      }
    default:
      return state
  }
}
