module.exports = {
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(|ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  "transformIgnorePatterns": [],
  "globals": {
    "__TS_CONFIG__": {
      "target": "es2015",
      "module": "commonjs",
      "jsx": "react"
    }
  },
  "testMatch": [
    "**/?(*.)test.(ts|tsx|js)"
  ]
}