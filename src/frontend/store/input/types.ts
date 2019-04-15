import { Language, ValidLanguageCode } from '../../../types'

export interface InputState {
    text: string,
    languages: ValidLanguageCode[]
}

export const CHANGE_TEXT = 'CHANGE_TEXT'

interface TextChangedAction {
    type: typeof CHANGE_TEXT
    payload: string
}

export const CHANGE_LANGUAGES = 'CHANGE_LANGUAGE'

interface LanguagesChangedAction {
    type: typeof CHANGE_LANGUAGES
    payload: {
        newLanguageCode: ValidLanguageCode,
        index: number
    }
}

export type AnyInputAction = TextChangedAction | LanguagesChangedAction