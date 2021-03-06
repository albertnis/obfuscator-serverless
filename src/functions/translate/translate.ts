import AWS, { AWSError } from 'aws-sdk'
import { ValidLanguageCode } from '../../types'
import { LambdaResponse, TranslationResponse } from './types'
import { validateEvent } from './validation';
import { TranslateTextResponse, TranslateTextRequest } from 'aws-sdk/clients/translate';

const MAX_LANGUAGES: number = 5
const MAX_CHARS: number = 100

var successResponse = (responseObj: TranslationResponse): LambdaResponse => response(responseObj, 200)
var badParametersResponse = (responseObj: string): LambdaResponse => response(responseObj, 400)
var failedDependencyResponse = (responseObj: any): LambdaResponse => response(responseObj, 424)

const response = (responseObj: TranslationResponse | string, code: number): LambdaResponse => {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*' // Enable CORS for all responses (for now)
    },
    body: typeof(responseObj) === 'string' ? responseObj : JSON.stringify(responseObj)
  }
}

export const translate = async (event: any, context: any, callback: any) => {
  let validationResponse = validateEvent(event, MAX_LANGUAGES, MAX_CHARS)

  if (!(validationResponse.Valid)) {
    callback(null, badParametersResponse(validationResponse.StatusMessage))
    return
  }

  var translateClient = new AWS.Translate()
  let { text, languageCodes: langs } = validationResponse.Result
  let result = await runCyclicTranslation(translateClient, text, langs)
  callback(null, successResponse(result))
  return
}

var runCyclicTranslation = async (client: AWS.Translate, text: string, languageCodes: ValidLanguageCode[]): Promise<TranslationResponse> => {
  let responses = [await runTranslation(client, text, languageCodes[0], languageCodes[1])]
  for (let i = 1; i < (languageCodes.length - 1); i++) {
    let ithResponse = await runTranslation(client, responses[i - 1].TranslatedText, languageCodes[i], languageCodes[i + 1])
    responses = [...responses, ithResponse]
  }
  return { translations: responses }
}

var runTranslation = async (client: AWS.Translate, text: string, from: ValidLanguageCode, to: ValidLanguageCode) => {
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
