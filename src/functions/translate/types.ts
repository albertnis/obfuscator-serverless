import { ValidLanguageCode } from '../../types'
import { TranslateTextCommandOutput } from '@aws-sdk/client-translate'

export interface Request {
  text: string
  languageCodes: ValidLanguageCode[]
}

export interface ValidationResponse {
  Valid: boolean
  StatusMessage: string
  Result: Request
}

export interface TranslationResponse {
  translations: TranslateTextCommandOutput[]
}

export interface LambdaResponse {
  statusCode: number
  headers: any
  body: string
}
