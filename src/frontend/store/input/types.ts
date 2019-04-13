export interface InputState {
    text: string
}

export const CHANGE_TEXT = 'CHANGE_TEXT'

interface TextChangedAction {
    type: typeof CHANGE_TEXT
    payload: string
}

export type AnyInputAction = TextChangedAction