import { TranslateState, AnyTranslateAction, TRANSLATE__SUCCESS, TRANSLATE__REQUEST } from './types'

const initialState: TranslateState = {
  translations: null,
  loading: false
}

export const translateReducer = (state: TranslateState = initialState, action: AnyTranslateAction): TranslateState => {
  switch (action.type) {
    case TRANSLATE__REQUEST:
      return {
        ...state,
        translations: null,
        loading: true
      }
    case TRANSLATE__SUCCESS:
      return {
        ...state,
        translations: action.payload.translations,
        loading: false
      }
    default:
      return state
  }
}
