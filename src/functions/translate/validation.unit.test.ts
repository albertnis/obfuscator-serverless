import { validateEvent } from "./validation";

test('parses well-formed request', () => {
  let event = {
    "queryStringParameters": {
      "text": "testing",
      "languages": ["en", "fr", "es"]
    }
  }

  let result = validateEvent(event, 5)

  expect(result).toMatchObject({
    Valid: true,
    StatusMessage: null,
    Result: {
      text: "testing",
      languageCodes: ["en", "fr", "es"]
    }
  })
})