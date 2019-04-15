import initialState from '../../backend/initialState'
import view from '../../backend/view'
import ssr from '../../backend/ServerClient'

export const server = (event, context, callback) => {
  const renderOutput = ssr(initialState)
  const content = view('Obfuscator', renderOutput)

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Enable CORS for all responses (for now)
      'Content-Type': 'text/html'
    },
    body: content
  });
}