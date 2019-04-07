## Running locally

1. Install dependencies with NPM
    ```bash
    npm i
    ```

1. Build and watch frontend and backend with webpack
    ```bash
    npm start
    ```

1. In a different terminal instance, start the backend with Node
    ```bash
    npm run server
    ```

Then go to localhost:3000.

While the start script is running, changes to the frontend will require a browser refresh (I recommend Live Reload to do this automatically). Changes to the backend will require a server restart.

## Deploying

1. Install dependencies with NPM
    ```bash
    npm i
    ```

1. Build assets with webpack
    ```bash
    npm run build-prod
    ```

1. Package functions
    ```bash
    deploy/package.sh
    ```

1. Deploy to AWS
    ```bash
    deploy/deploy.sh
    ```