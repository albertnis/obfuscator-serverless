import { CHANGE_TEXT, AnyInputAction } from './types'

export const changeText = (newText: string): AnyInputAction => ({
    type: CHANGE_TEXT,
    payload: newText
})