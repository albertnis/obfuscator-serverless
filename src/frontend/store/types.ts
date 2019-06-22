import { InputState, AnyInputAction } from './input/types'
import { AnyTranslateAction, TranslateState } from './translate/types';

export type AppState = {
  input: InputState,
  translate: TranslateState
}

export type AnyAction = AnyInputAction | AnyTranslateAction