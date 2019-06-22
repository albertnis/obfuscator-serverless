import { TRANSLATE__REQUEST, TRANSLATE__SUCCESS, TRANSLATE__FAILURE, TRANSLATE__ERROR, AnyTranslateAction, LanguageTextMapping } from './types'
import { TranslateTextResponse } from 'aws-sdk/clients/translate';
import { InputState } from '../input/types';
import { ValidLanguageCode } from '../../../types';

export const translateRequest = (inputState: InputState): AnyTranslateAction => {
  let langParams = inputState.languages.map(lang =>
    `&languages=${lang.toString()}`
  ).join('')

  return {
    type: TRANSLATE__REQUEST,
    payload: {
      queryString: `?text=${inputState.text}${langParams}`
    }
  }
}

let f = ValidLanguageCode[ValidLanguageCode.en]

export const translateResponse = (response: any): AnyTranslateAction => {
  if (response) {
    let responseObj: TranslateTextResponse[] = []
    try {
      responseObj = JSON.parse(response)
    }
    catch {
      return translateFailure(JSON.stringify(response))
    }
    return translateSuccess(responseObj)
  }
  return translateError()
}


export const translateSuccess = (parsedTranslations: TranslateTextResponse[]): AnyTranslateAction => ({
  type: TRANSLATE__SUCCESS,
  payload: {
    translations: parsedTranslations.map(trans => ({
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