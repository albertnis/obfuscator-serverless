import { ValidLanguageCode } from '../../types'
import { TranslateTextResponse } from 'aws-sdk/clients/translate';

export interface Request {
    text: string,
    languageCodes: ValidLanguageCode[]
  }

export interface ValidationResponse {
  Valid: boolean;
  StatusMessage: string;
  Result: Request;
}

export interface TranslationResponse {
  translations: TranslateTextResponse[]
}

export interface LambdaResponse {
  statusCode: number,
  headers: any,
  body: string
}