# lorem-ipsum

TODO....

## Setup

```
npm install -g @nestjs/cli
```


// TODO Fow now everything is copied from event-integrations
// need to simplify
// Also some of this stuff will be on https://developer.todoist.com/guides/ as well

## Local environment variables

To tailor your dev environment, create a `.env` file and put in the relevant settings:

-   `PORT`: The port the backend will run on
-   `VERIFICATION_TOKENS`: This is a comma-separated list of valid tokens from https://todoist.com/app_console that will be used to verify the token has come from Todoist.
-   `BASE_URL`: This is the domain for accessing static files (like images)

## Running the integration

To install the dependencies using `npm install`, you first need to be authenticated to GitHub Packages, which might not be the case by default. See [here](https://docs.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages) for instructions.

Once you have Github Packages authenticated, you need to run the following commands:

-   `npm install`
-   `npm run start:dev`

_Alternatively, you can run `docker-compose up` which runs the server in-container._

### Environment setup

Before you run the integration locally, copy `example.env ` as `.env`, and edit by adding necessary credentials (follow the comments inside the file).

### Create Extensions

In order to make an integration available in Twist or Todoist, you need to setup an equivalent Extension.

Note that you can make the integration available on different environments:

| Products | Production          | Staging                     |
| -------- | ------------------- | --------------------------- |
| Twist    | https://twist.com   | https://staging.twist.com   |
| Todoist  | https://todoist.com | https://staging.todoist.com |

#### Create Twist Extensions

1. Add a new Extension of type `General integration` in the App Console:
- Do this in the [production App Console](https://twist.com/app_console) if you want the interation to be available in production
- Do this in the [staging App Console](https://staging.twist.com/app_console) if you want the interation to be available in staging
2. From the `Basic info` section, note _Verification token_, and add it to `.env` as `VERIFICATION_TOKENS`
3. In the `OAuth Authentication` section, point `OAuth 2 redirect URL` to `[BASE URL from .env]/auth`
4. In the `UI Extensions` section, add a new extension:
- For Composer Extensions: 
    * Click "Add a new UI extension"
    * Select "Composer" as the "Extension type"
    * Point "Data exchange endpoint URL" to `[BASE URL from .env]/process`
        - Special case: for the Google Meet extension, point "Data exchange endpoint URL" to `[BASE URL from .env]/adhoc`
- For Context-Menu Extensions:
    * Click "Add a new UI extension"
    * Select "Context menu" as the "Extension type"
    * Point "Data exchange endpoint URL" to `[BASE URL from .env]/process`
- For Settings Extensions:
    * Click "Add a settings extension"  
    * Point "Data exchange endpoint URL" to `[BASE_URL from .env]/settings`
5. In the `Installation` section, copy the `Shareable Install URL` and paste it into any brower to install the extension
6. Test the new extension, depending on the type of extension you added:
- For Composer Extensions: hit `/` in a Twist message and select the extension from the list
- For Context-Menu Extensions: click on the context-menu in a Twist thread, channel, or conversation message and select the extension from the list
- For Settings Extensions: go to Twist > "Settings & members" > "Integrations" and select the extension from the list

#### Create Todoist Extensions

1. Add a new App in the App Console:
- Do this in the [production App Console](https://todoist.com/app_console) if you want the interation to be available in production
- Do this in the [staging App Console](https://staging.todoist.com/app_console) if you want the interation to be available in staging
2. Point "App Service URL" to `[BASE URL from .env]`
2. From the `App settings` section, note _Verification token_, and add it to `.env` as `VERIFICATION_TOKENS`
3. In the `OAuth Authentication` section, point `OAuth redirect URL` to `[BASE URL from .env]/auth`
4. In the `UI Extensions` section, add a new extension:
- For Composer Extensions: 
    * Click "Add a new UI extension"
    * Select "Composer" as the "Extension type"
    * Point "Data exchange endpoint URL" to `[BASE URL from .env]/process`
- For Context-Menu Extensions:
    * Click "Add a new UI extension"
    * Select "Context menu" as the "Extension type"
    * Point "Data exchange endpoint URL" to `[BASE URL from .env]/process`
- For Settings Extensions:
    * Click "Add a settings extension"  
    * Point "Data exchange endpoint URL" to `[BASE_URL from .env]/settings`
5. In the `Installation` section, click on the `Install for me` button to install the extension
6. Test the new extension, depending on the type of extension you added:
- For Composer Extensions: hit `/` in a Todoist task or comment and select the extension from the list
- For Context-Menu Extensions: click on the context-menu in a Todoist task or project > Integrations > select the extension from the list
- For Settings Extensions: go to Todoist > Profile photo menu > Integrations and select the extension from the list

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
