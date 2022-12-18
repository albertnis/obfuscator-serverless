import view from './view'
import ssr from './ServerClient'

export const server = async (event, context, callback) => {
  const { content, state } = ssr()
  const page = view('Obfuscator', content, state)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Enable CORS for all responses (for now)
      'Content-Type': 'text/html',
    },
    body: page,
  }
}
