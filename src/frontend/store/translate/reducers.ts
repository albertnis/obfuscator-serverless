import { TranslateState, AnyTranslateAction, TRANSLATE__SUCCESS, TRANSLATE__REQUEST, TRANSLATE__FAILURE, TRANSLATE__ERROR } from './types'

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
    case TRANSLATE__FAILURE:
      return {
        ...state,
        translations: null,
        loading: false
      }
    case TRANSLATE__ERROR:
      return {
        ...state,
        translations: null,
        loading: false
      }
    default:
      return state
  }
}
