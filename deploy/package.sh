cp ../src/functions/server/dist/server.js ./server.js
cp ../src/functions/translate/translate.js ./translate.js
zip ../dist/server.zip ./server.js
zip ../dist/translate.zip ./translate.js
rm ./server.js
rm ./translate.js
