# Lorem Ipsum UI Extension

Simple integration that includes different UI extensions:
1. Project context menu UI extension to add lorem ipsum tasks to the current Todoist project
2. Composer extension that injects lorem ipsum text into the composer
3. Sample settings extension that displays a message in the integration settings

## Local development

### Local environment variables

To tailor your dev environment, create a `.env` file and put in the relevant settings:

-   `PORT`: The port the backend will run on
-   `VERIFICATION_TOKENS`: This is a comma-separated list of valid tokens from https://todoist.com/app_console that will be used to verify the token has come from Todoist.
-   `BASE_URL`: This is the domain for accessing static files (like images)

## Run your integration service

```shell
npm install
npm run dev
```

### Environment setup

Before you run the integration locally, copy `example.env ` as `.env`, and edit by adding necessary credentials (follow the comments inside the file).

## Expose your localhost

In order for Todoist to be able to communicate with your integration, we need to expose your service to the internet. There are a couple of tools available to create this kind of tunnel:

- [`ngrok`](https://ngrok.com/)
- [`localtunnel`](https://www.npmjs.com/package/localtunnel)
- [`Cloudflare Tunnels`](https://www.cloudflare.com/en-gb/products/tunnel/)

Make sure to start your tool of choice with the `PORT` from `.env`, for example `ngrok http 3000`.

For example, if you choose to use `ngrok`, you'll be running some variation of the following command (we chose to listen on port 3000):

Take note of the URL exposed by your tool of choice, as you'll need it in the next step (i.e. `https://my-extension-service`).

## Create a Todoist App

1. Visit the [App Management Console](https://todost.com/app_console) (you'll be prompted to log in if you're not already)
2. Click "Create a new app" and insert a name in the "App name" field (i.e. "Lorem Ipsum")
3. Create three different UI Extensions:
    1. In the `UI Extensions` section, click "Add a new UI extension":
        * Give it a name (i.e. "Add lorem ipsum tasks")
        * Select "Context menu" as the "Extension type" (and "Project" as the "Context type") 
        * Point "Data exchange endpoint URL" to your service URL followed by `/process` (or the endpoint name you chose when [creating your own integrations service](#create-your-own-integrations-service)). This value in this field might look something like `https://my-extension-service/process`
    2. In the `UI Extensions` section, click "Add a new UI extension":
        * Give it a name (i.e. "Add lorem ipsum content")
        * Select "Composer" as the "Extension type"
        * Point "Data exchange endpoint URL" to your service URL followed by `/process` (or the endpoint name you chose when [creating your own integrations service](#create-your-own-integrations-service)). This value in this field might look something like `https://my-extension-service/process`
    3. In the `UI Extensions` section, click "Add a new settings extension":
        * Give it a name (i.e. "Lorem ipsum settings")
        * Point "Data exchange endpoint URL" to your service URL followed by `/process` (or the endpoint name you chose when [creating your own integrations service](#create-your-own-integrations-service)). This value in this field might look something like `https://my-extension-service/process`
6. Select the `task:add` scope
7. In the `Installation` section, click on the `Install for me` button

## Use your UI Extension

1. Visit [Todoist](https://todost.com)
2. Test your context menu extension:
    * Select any of your Todoist projects (or create a new one)
    * Click on the context menu icon of that project, select "Integrations" and finally select your UI Extension from the list (i.e. "Add lorem ipsum tasks")
    * You should see a few tasks being added to your current project
4. Test your composer extension:
    * Select any of your Todoist tasks (or create a new one)
    * Click inside the comment composer, select "Add lorem ipsum content" in the composer extensions menu
    * You should see content being injected into the composer
5. Test your settings extension:
    * Click on the profile picture menu > "Settings" > "Integrations"
    * Click on the name of your app (i.e. "Lorem Ipsum"), then "Settings"
    * You should see some custom text
