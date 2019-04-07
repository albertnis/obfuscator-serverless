GIT_HASH=$(git rev-parse --short HEAD)

# 1. Copy files temporarily
cp ../src/functions/server/dist/server.js ./server.js
cp ../src/functions/translate/translate.js ./translate.js

# 3. Create build directory
mkdir -p ../dist

# 3. Remove old artifacts
rm -f ../dist/*

# 4. Package (move) into zip files
zip -m ../dist/server-$GIT_HASH.zip ./server.js
zip -m ../dist/translate-$GIT_HASH.zip ./translate.js
