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

If you want to develop the frontend with hot-reloading, dev-server is your best bet. Server-side rendering will not occur.

4. In a second terminal instance, run webpack dev server
    ```bash
    yarn dev-server
    ```

Then go to localhost:3000. Changes to code will trigger component reloads.

### Full-stack

The full stack can also be tested.

4. In a second terminal instance, build and watch frontend and backend with webpack
    ```bash
    yarn start
    ```

5. In a third terminal instance, start the backend with Node
    ```bash
    yarn server
    ```

Then go to localhost:3000.

While the start script is running, changes to the frontend will require a browser refresh (I recommend Live Reload to do this automatically). Changes to the backend will require a server restart.

## Deploying

1. Install dependencies with Yarn
    ```shell
    yarn install
    ```

1. Build assets with webpack
    ```shell
    yarn build-prod
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