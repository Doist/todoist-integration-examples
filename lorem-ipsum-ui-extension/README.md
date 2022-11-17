# lorem-ipsum

TODO

## Local environment variables

To tailor your dev environment, create a `.env` file and put in the relevant settings:

-   `PORT`: The port the backend will run on
-   `VERIFICATION_TOKENS`: This is a comma-separated list of valid tokens from https://todoist.com/app_console that will be used to verify the token has come from Todoist.
-   `BASE_URL`: This is the domain for accessing static files (like images)

## Running the integration

To install the dependencies using `npm install`, you first need to be authenticated to GitHub Packages, which might not be the case by default. See [here](https://docs.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages) for instructions.

Once you have Github Packages authenticated, you need to run the following commands:

-   `npm install`
-   `npm run dev`

_Alternatively, you can run `docker-compose up` which runs the server in-container._

### Environment setup

Before you run the integration locally, copy `example.env ` as `.env`, and edit by adding necessary credentials (follow the comments inside the file).

### Create Extensions

In order to make this UI Extension available in Todoist, you need to set up a Todoist App:

1. Add a new App [here](https://todoist.com/app_console)
2. Point "App Service URL" to `[BASE URL from .env]`
2. From the `App settings` section, note _Verification token_, and add it to `.env` as `VERIFICATION_TOKENS`
3. In the `OAuth Authentication` section, point `OAuth redirect URL` to `[BASE URL from .env]/auth`
4. In the `UI Extensions` section, add a new extension:
- For Context-Menu Extensions:
    * Click "Add a new UI extension"
    * Select "Context menu" as the "Extension type"
    * Point "Data exchange endpoint URL" to `[BASE URL from .env]/process`
5. In the `Installation` section, click on the `Install for me` button to install the extension
6. Test the new extension, depending on the type of extension you added:
- For Context-Menu Extensions: click on the context-menu in a Todoist task or project > Integrations > select the extension from the list

### Start Ngrok

In order to access a locally running integration from the Twist or Todoist production or staging environment, make sure to start ngrok with the `PORT` from `.env`, for example `ngrok http -subdomain doister 3000`.

## Display the UI Extension

Follow the instructions in the [`Create Todoist Extensions`](./../README.md#create-todoist-extensions) to setup and test your UI Extension. In particular:

-   Add a new Context-Menu extension
-   Select the `data:read_write` scope
    -   Note that scope `task:add` should be enough, but we'll see how it goes with https://github.com/Doist/Issues/issues/7882
-   Visit Todoist Web
-   Click a the context-menu of a project > Integrations > select the extension from the list
-   You should see new tasks getting added to the current project
