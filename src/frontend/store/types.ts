import { InputState } from './input/types'

export type AppState = {
  input: InputState
}

export const initialState: AppState = {
  input: {
    text: 'initial'
  }
}