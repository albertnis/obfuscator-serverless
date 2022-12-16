import { ValidLanguageCode } from '../../types'
import { validateEvent } from './validation'
import {
  TranslateTextCommandOutput,
  Translate,
} from '@aws-sdk/client-translate'
import { LambdaResponse, TranslationResponse } from './types'

const MAX_LANGUAGES: number = 5
const MAX_CHARS: number = 100

var successResponse = (responseObj: TranslationResponse): LambdaResponse =>
  response(responseObj, 200)
var badParametersResponse = (responseObj: string): LambdaResponse =>
  response(responseObj, 400)

const response = (
  responseObj: TranslationResponse | string,
  code: number
): LambdaResponse => {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*', // Enable CORS for all responses (for now)
    },
    body:
      typeof responseObj === 'string'
        ? responseObj
        : JSON.stringify(responseObj),
  }
}

export const translate = async (event: any, context: any, callback: any) => {
  let validationResponse = validateEvent(event, MAX_LANGUAGES, MAX_CHARS)

  if (!validationResponse.Valid) {
    callback(null, badParametersResponse(validationResponse.StatusMessage))
    return
  }

  var translateClient = new Translate({})
  let { text, languageCodes: langs } = validationResponse.Result
  let result = await runCyclicTranslation(translateClient, text, langs)
  callback(null, successResponse({ translations: result }))
  return
}

var runCyclicTranslation = async (
  client: Translate,
  text: string,
  languageCodes: ValidLanguageCode[]
): Promise<TranslateTextCommandOutput[]> => {
  let responses = [
    await runTranslation(client, text, languageCodes[0], languageCodes[1]),
  ]
  for (let i = 1; i < languageCodes.length - 1; i++) {
    let ithResponse = await runTranslation(
      client,
      responses[i - 1].TranslatedText,
      languageCodes[i],
      languageCodes[i + 1]
    )
    responses = [...responses, ithResponse]
  }
  return responses
}

var runTranslation = async (
  client: Translate,
  text: string,
  from: ValidLanguageCode,
  to: ValidLanguageCode
) =>
  await client.translateText({
    SourceLanguageCode: from,
    TargetLanguageCode: to,
    Text: text,
  })
