import { ValidLanguageCode } from '../../../types'
import { TranslateTextResponse } from 'aws-sdk/clients/translate';
import { InputState } from '../input/types';

export interface LanguageTextMapping {
    languageCode: ValidLanguageCode,
    text: string
}

export interface TranslateState {
    translations: LanguageTextMapping[]
    loading: boolean
}

export const TRANSLATE__REQUEST = 'TRANSLATE__REQUEST'
export interface TranslateRequestAction {
    type: typeof TRANSLATE__REQUEST,
    payload: {
        queryString: string
    }
}

export const TRANSLATE__SUCCESS = 'TRANSLATE__SUCCESS'
interface TranslateSuccessAction {
    type: typeof TRANSLATE__SUCCESS,
    payload: {
        translations: LanguageTextMapping[]
    }
}

export const TRANSLATE__FAILURE = 'TRANSLATE__FAILURE'
interface TranslateFailureAction {
    type: typeof TRANSLATE__FAILURE,
    payload: {
        response: string
    }
}

export const TRANSLATE__ERROR = 'TRANSLATE__ERROR'
interface TranslateErrorAction {
    type: typeof TRANSLATE__ERROR
}

export type AnyTranslateAction = TranslateRequestAction | TranslateSuccessAction | TranslateFailureAction | TranslateErrorAction