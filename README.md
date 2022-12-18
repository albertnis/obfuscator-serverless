# Obfusactor Serverless

There are three deployables in this repo:

| Entrypoint                               | Description                                                        |
| ---------------------------------------- | ------------------------------------------------------------------ |
| [src/frontend/index.html]()              | Build main JS and CSS bundle to src/frontend/dist/static           |
| [src/functions/server/server.js]()       | AWS Lambda which does SSR and serves the result                    |
| [src/functions/translate/translate.ts]() | AWS Labmda which acts as API endpoint to perform translation calls |

## Running locally

1. Install dependencies with Yarn

   ```bash
   yarn install
   ```

1. Run mocked function endpoints

   ```bash
   yarn run functions
   ```

1. Run in either front-end or full-stack mode, as below:

### Front-end

If you want to develop the frontend with hot-reloading, dev-server is your best bet. Server-side rendering will not occur. Served HTML will be based on [src/frontend/index.html]().

4. In a second terminal instance, run the live server

   ```bash
   yarn start:frontend
   ```

Then go to localhost:3000. Changes to code will trigger component reloads.

### Full-stack

The full stack can also be tested.

4. In a second terminal instance, build frontend and backend with webpack

   ```bash
   yarn build:functions:dev && yarn build:frontend:dev
   ```

5. In a third terminal instance, start a local mock of the backend with Node. This starts a web server which calls the SSR logic of the translate Labmda.

   ```bash
   yarn start:localserver
   ```

Then go to localhost:3000.

While the start script is running, changes to the frontend will require a re-run of the build commands and a restart of localserver.

## Build and deploy

1. Install dependencies with Yarn

   ```shell
   yarn install
   ```

1. Build assets with webpack

   > Note: Due to a missing feature in Vite, you need to build each lambda separately. See [functions.vite.config.ts]() for more information

   ```shell
   yarn build:functions && yarn build:frontend
   ```

1. Package functions

   ```shell
   cd deploy
   ./package.sh
   ```

1. Deploy to AWS, passing name of deployment bucket to be created

   ```shell
   cd deploy
   ./deploy.sh unique-deployment-bucket-name
   ```
