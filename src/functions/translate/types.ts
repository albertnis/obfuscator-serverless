import { Language } from '../../types'

export interface Request {
    text: string,
    languages: Language[]
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