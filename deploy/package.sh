GIT_HASH=$(git rev-parse --short HEAD)

# 1. Copy files temporarily
cp ../src/functions/dist/server.mjs ./server.mjs
cp ../src/functions/dist/translate.mjs ./translate.mjs

# 3. Create build directory
mkdir -p ../dist

# 3. Remove old artifacts
rm -f ../dist/*

# 4. Package (move) into zip files
zip -m ../dist/server-$GIT_HASH.zip ./server.mjs
zip -m ../dist/translate-$GIT_HASH.zip ./translate.mjs
