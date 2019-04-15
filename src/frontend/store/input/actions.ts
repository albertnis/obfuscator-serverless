import { CHANGE_TEXT, CHANGE_LANGUAGES, AnyInputAction } from './types'
import { ValidLanguageCode } from '../../../types';

export const changeText = (newText: string): AnyInputAction => ({
    type: CHANGE_TEXT,
    payload: newText
})

export const changeLanguages = (newLanguageCode: ValidLanguageCode, index: number): AnyInputAction => ({
    type: CHANGE_LANGUAGES,
    payload: {
        newLanguageCode: newLanguageCode,
        index
    }
})