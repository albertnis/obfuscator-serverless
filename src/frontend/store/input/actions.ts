import { CHANGE_TEXT, CHANGE_LANGUAGES, AnyInputAction } from './types'
import { Language } from '../../constants/languages';

export const changeText = (newText: string): AnyInputAction => ({
    type: CHANGE_TEXT,
    payload: newText
})

export const changeLanguages = (newLanguage: Language, index: number): AnyInputAction => ({
    type: CHANGE_LANGUAGES,
    payload: {
        newLanguage,
        index
    }
})