import { validateEvent } from './validation';

test('parses well-formed request', () => {
  let event = {
    'queryStringParameters': {
      'text': 'testing'
    },
    'multiValueQueryStringParameters': {
      'languages': ['en', 'fr', 'es']
    }
  }

  let result = validateEvent(event, 5)

  expect(result).toMatchObject({
    Valid: true,
    StatusMessage: null,
    Result: {
      text: 'testing',
      languageCodes: ['en', 'fr', 'es']
    }
  })
})

test('gracefully fails when no query parameters', () => {
  let event = {}

  let result = validateEvent(event, 5)

  expect(result).toMatchObject({
    Valid: false,
    StatusMessage: 'No query string parameters specified',
    Result: null
  })
})

test('gracefully fails when query parameters is array', () => {
  let event = {
    'queryStringParameters': ['1', '2'],
    'multiValueQueryStringParameters': ['1', '2']
  }

  let result = validateEvent(event, 5)

  expect(result).toMatchObject({
    Valid: false,
    StatusMessage: 'Query string parameters specified incorrectly',
    Result: null
  })
})

test('gracefully fails when no text present', () => {
  let event = {
    'queryStringParameters': {},
    'multiValueQueryStringParameters': {
      'languages': ['en', 'fr', 'es']
    }
  }

  let result = validateEvent(event, 5)

  expect(result).toMatchObject({
    Valid: false,
    StatusMessage: 'No text to translate specified',
    Result: null
  })
})

test('gracefully fails when text too long', () => {
  let event = {
    'queryStringParameters': {
      'text': 'oh noes'
    },
    'multiValueQueryStringParameters': {
      'languages': ['en', 'fr', 'es']
    }
  }

  let result = validateEvent(event, 5, 2)

  expect(result).toMatchObject({
    Valid: false,
    StatusMessage: 'Text to translate must be at most 2 characters long',
    Result: null
  })
})

test('gracefully fails when languages not present', () => {
  let event = {
    'queryStringParameters': {
      'text': 'testing'
    },
    'multiValueQueryStringParameters': {}
  }

  let result = validateEvent(event, 5)

  expect(result).toMatchObject({
    Valid: false,
    StatusMessage: 'Translation languages specified incorrectly',
    Result: null
  })
})

test('gracefully fails when languages is not array', () => {
  let event = {
    'queryStringParameters': {
      'text': 'testing'
    },
    'multiValueQueryStringParameters': {
      'languages': { '1': 'en', '2': 'fr', '3': 'es' }
    }
  }

  let result = validateEvent(event, 5)

  expect(result).toMatchObject({
    Valid: false,
    StatusMessage: 'Translation languages specified incorrectly',
    Result: null
  })
})

test('gracefully fails when too few languages', () => {
  let event = {
    'queryStringParameters': {
      'text': 'testing'
    },
    'multiValueQueryStringParameters': {
      'languages': ['en']
    }
  }

  let result = validateEvent(event, 5)

  expect(result).toMatchObject({
    Valid: false,
    StatusMessage: 'At least 2 languages must be specified',
    Result: null
  })
})

test('gracefully fails when too many languages', () => {
  let event = {
    'queryStringParameters': {
      'text': 'testing'
    },
    'multiValueQueryStringParameters': {
      'languages': ['en', 'fr', 'es', 'ja', 'fi', 'de']
    }
  }

  let result = validateEvent(event, 2)

  expect(result).toMatchObject({
    Valid: false,
    StatusMessage: 'At most 2 languages must be specified',
    Result: null
  })
})

test('gracefully fails when languages invalid', () => {
  let event = {
    'queryStringParameters': {
      'text': 'testing'
    },
    'multiValueQueryStringParameters': {
      'languages': ['en', 'fr', 'xx']
    }
  }

  let result = validateEvent(event, 5)

  expect(result).toMatchObject({
    Valid: false,
    StatusMessage: 'At least one invalid language detected',
    Result: null
  })
})