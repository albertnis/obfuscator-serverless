import { TRANSLATE__REQUEST, TRANSLATE__SUCCESS, TRANSLATE__FAILURE, TRANSLATE__ERROR, AnyTranslateAction, LanguageTextMapping } from './types'
import { TranslateTextResponse } from 'aws-sdk/clients/translate';
import { InputState } from '../input/types';
import { ValidLanguageCode } from '../../../types';
import { TranslationResponse } from '../../../functions/translate/types';

export const translateRequest = (inputState: InputState): AnyTranslateAction => {
  let langParams = inputState.languages.map(lang =>
    `&languages=${encodeURI(lang)}`
  ).join('')

  return {
    type: TRANSLATE__REQUEST,
    payload: {
      queryString: `?text=${encodeURI(inputState.text)}${langParams}`
    }
  }
}

let f = ValidLanguageCode[ValidLanguageCode.en]

export const translateResponse = (response: any): AnyTranslateAction => {
  // TODO: Tidy up this error and type handling
  if (response) {
    let responseObj: TranslationResponse = null
    try {
      responseObj = response
    }
    catch {
      return translateFailure(JSON.stringify(response))
    }
    return translateSuccess(responseObj)
  }
  return translateError()
}


export const translateSuccess = (parsedTranslations: TranslationResponse): AnyTranslateAction => ({
  type: TRANSLATE__SUCCESS,
  payload: {
    translations: parsedTranslations.translations.map(trans => ({
      languageCode: (<any>ValidLanguageCode)[trans.TargetLanguageCode],
      text: trans.TranslatedText
    }))
  }
})

export const translateFailure = (response: string): AnyTranslateAction => ({
  type: TRANSLATE__FAILURE,
  payload: {
    response: response
  }
})

export const translateError = (): AnyTranslateAction => ({
  type: TRANSLATE__ERROR
})