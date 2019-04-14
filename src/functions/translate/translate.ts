import AWS, { AWSError, Lambda } from 'aws-sdk'
import { Language } from '../../types'
import { ValidationResponse, LambdaResponse } from './types'
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

  let { text, languages } = validationResponse.Result

  var translateClient = new AWS.Translate()

  var result1, result2, result3, result4, response
  runTranslation(translateClient, text, language0, language1)
    .then(result => {
      result1 = result
      console.log(result)
      return runTranslation(translateClient, result.TranslatedText, language1, language2)
    })
    .then(result => {
      result2 = result
      console.log(result)
      return runTranslation(translateClient, result.TranslatedText, language2, language3)
    })
    .then(result => {
      result3 = result
      console.log(result)
      return runTranslation(translateClient, result.TranslatedText, language3, language0)
    })
    .then(result => {
      result4 = result
      console.log(result)
      callback(null, successResponse({ result1, result2, result3, result4 }))
    })
    .catch(error => {
      response = failedDependencyResponse(error)
      callback(null, response)
    })

  return
}





var runTranslation = (client, text, from, to) => {
  var params: TranslateTextRequest = {
    SourceLanguageCode: from,
    TargetLanguageCode: to,
    Text: text
  }

  return new Promise((resolve, reject) => {
    client.translateText(params, function (err: AWSError, data: TranslateTextResponse) {
      if (err) reject(err, err.stack)
      // an error occurred
      else {
        let { TargetLanguageCode, TranslatedText } = data
        resolve({ TargetLanguageCode, TranslatedText }) // successful response
      }
    })
  })
}
