import AWS, { AWSError, Lambda } from 'aws-sdk'
import { Language, ValidLanguageCode } from '../../types'
import { LambdaResponse } from './types'
import { validateEvent } from './validation';
import { TranslateTextResponse, TranslateTextRequest } from 'aws-sdk/clients/translate';

const MAX_LANGUAGES: number = 5

var successResponse = (responseObj: any): LambdaResponse => response(responseObj, 200)
var badParametersResponse = (responseObj: any): LambdaResponse => response(responseObj, 400)
var failedDependencyResponse = (responseObj: any): LambdaResponse => response(responseObj, 424)

const response = (responseObj: any, code: number): LambdaResponse => {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*" // Enable CORS for all responses (for now)
    },
    body: JSON.stringify(responseObj)
  }
}

export const translate = (event: any, context: any, callback: any) => {
  let validationResponse = validateEvent(event, MAX_LANGUAGES)

  if (!(validationResponse.Valid)) {
    callback(null, badParametersResponse(validationResponse.StatusMessage))
    return
  }
  
  var translateClient = new AWS.Translate()
  
  let { text, languageCodes } = validationResponse.Result
  
  let responses: TranslateTextResponse[] = []
  for (let i = 0; i < (languageCodes.length - 1); i++) {
    runTranslation(translateClient, text, languageCodes[i], languageCodes[i])
      .then((nextResponse: TranslateTextResponse): void => {
        responses = [...responses, nextResponse]
      })
      .catch((error: AWSError) => {
        callback(null, failedDependencyResponse(error))
      })
  }
  callback(null, successResponse(responses))
  return
}

var runTranslation = (client: AWS.Translate, text: string, from: ValidLanguageCode, to: ValidLanguageCode) => {
  var params: TranslateTextRequest = {
    SourceLanguageCode: from,
    TargetLanguageCode: to,
    Text: text
  }

  return new Promise<TranslateTextResponse>((resolve, reject) => {
    client.translateText(params, (err: AWSError, data: TranslateTextResponse): void => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
