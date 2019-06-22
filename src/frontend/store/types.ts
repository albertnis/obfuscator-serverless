import { InputState, AnyInputAction } from './input/types'
import { AnyTranslateAction, TranslateState } from './translate/types';

export type AppState = {
  input: InputState,
  translate: TranslateState
}

export const initialState: AppState = {
  input: {
    text: 'indexinitial',
    languages: []
  },
  translate: {
    loading: false,
    translations: []
  }
}

export type AnyAction = AnyInputAction | AnyTranslateAction