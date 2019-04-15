import { ValidationResponse } from './types';
import { ValidLanguageCode } from '../../types'

export const validateEvent = (event: any, maxLanguages: number): ValidationResponse => {
  console.log('Validating event')
  console.log(event)
  if (!('queryStringParameters' in event) || !('multiValueQueryStringParameters' in event)) {
    return {
      Valid: false,
      StatusMessage: 'No query string parameters specified',
      Result: null
    }
  }

  let qsp = event.queryStringParameters
  let mvqsp = event.multiValueQueryStringParameters

  if (Array.isArray(qsp) || Array.isArray(mvqsp)) {
    return {
      Valid: false,
      StatusMessage: 'Query string parameters specified incorrectly',
      Result: null
    }
  }

  if (!('text' in qsp)) {
    return {
      Valid: false,
      StatusMessage: 'No text to translate specified',
      Result: null
    }
  }

  if (
    !('languages' in mvqsp
      && Array.isArray(mvqsp['languages'])
    )
  ) {
    return {
      Valid: false,
      StatusMessage: 'Translation languages specified incorrectly',
      Result: null
    }
  }

  if (mvqsp['languages'].length < 2) {
    return {
      Valid: false,
      StatusMessage: 'At least 2 languages must be specified',
      Result: null
    }
  }

  if (mvqsp['languages'].length > maxLanguages) {
    return {
      Valid: false,
      StatusMessage: `At most ${maxLanguages} languages must be specified`,
      Result: null
    }
  }

  let allLangsValid = mvqsp['languages'].every((l: any): boolean => {
    return (Object.keys(ValidLanguageCode).indexOf(l) > -1)
  })

  if (!allLangsValid) {
    return {
      Valid: false,
      StatusMessage: 'At least one invalid language detected',
      Result: null
    }
  }

  return {
    Valid: true,
    StatusMessage: null,
    Result: {
      text: qsp.text,
      languageCodes: mvqsp.languages
    }
  }
}