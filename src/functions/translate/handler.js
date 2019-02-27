const AWS = require("aws-sdk");
var exports = {};

exports.translate = (event, context, callback) => {
  if (
    !(
      "text" in event.queryStringParameters &&
      "language0" in event.queryStringParameters &&
      "language1" in event.queryStringParameters &&
      "language2" in event.queryStringParameters &&
      "language3" in event.queryStringParameters
    )
  ) {
    callback(badParametersResponse("Languages not found in request"));
    return;
  }

  let { text, language0, language1, language2, language3 } = event.queryStringParameters;

  var translateClient = new AWS.Translate();

  var result1, result2, result3, result4, response;
  translate(translateClient, text, language0, language1)
    .then(result => {
      result1 = result;
      console.log(result);
      return translate(translateClient, result.TranslatedText, language1, language2);
    })
    .then(result => {
      result2 = result;
      console.log(result);
      return translate(translateClient, result.TranslatedText, language2, language3);
    })
    .then(result => {
      result3 = result;
      console.log(result);
      return translate(translateClient, result.TranslatedText, language3, language0);
    })
    .then(result => {
      result4 = result;
      console.log(result);
      callback(null, successResponse({ result1, result2, result3, result4 }));
    })
    .catch(error => {
      response = failedDependencyResponse(error);
      callback(response);
    });

    return;
};

var successResponse = responseObj => response(responseObj, 200);
var badParametersResponse = responseObj => response(responseObj, 400);
var failedDependencyResponse = responseObj => response(responseObj, 424);

const response = (responseObj, code) => {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin": "*" // Enable CORS for all responses (for now)
    },
    body: JSON.stringify(responseObj)
  };
};

var translate = (client, text, from, to) => {
  var params = {
    SourceLanguageCode: from,
    TargetLanguageCode: to,
    Text: text
  };

  return new Promise((resolve, reject) => {
    client.translateText(params, function(err, data) {
      if (err) reject(err, err.stack);
      // an error occurred
      else {
        let { TargetLanguageCode, TranslatedText } = data;
        resolve({ TargetLanguageCode, TranslatedText }); // successful response
      }
    });
  });
};

module.exports = exports;
