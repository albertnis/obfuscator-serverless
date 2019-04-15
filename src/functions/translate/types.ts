import { ValidLanguageCode } from '../../types'

export interface Request {
    text: string,
    languageCodes: ValidLanguageCode[]
  }

export interface ValidationResponse {
  Valid: boolean;
  StatusMessage: string;
  Result: Request;
}

export interface LambdaResponse {
  statusCode: number,
  headers: any,
  body: string
}