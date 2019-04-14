import { ValidationResponse } from './types';

export const validateEvent = (event: any, maxLanguages: number): ValidationResponse => {
    if (!('queryStringParameters' in event)) {
        return {
            Valid: false,
            StatusMessage: 'No query string parameters specified',
            Result: null
        }
    }

    let qsp = event.queryStringParameters
    if (Array.isArray(qsp)) {
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
        !('languages' in qsp
            && Array.isArray(qsp['languages'])
        )
    ) {
        return {
            Valid: false,
            StatusMessage: 'Translation languages specified incorrectly',
            Result: null
        }
    }

    if (qsp['languages'].length < 2) {
        return {
            Valid: false,
            StatusMessage: 'At least 2 languages must be specified',
            Result: null
        }
    }

    if (qsp['languages'].length > maxLanguages) {
        return {
            Valid: false,
            StatusMessage: `At most ${maxLanguages} languages must be specified`,
            Result: null
        }
    }

    return {
        Valid: true,
        StatusMessage: null,
        Result: {
            text: qsp.text,
            languages: qsp.languages
        }
    }
}