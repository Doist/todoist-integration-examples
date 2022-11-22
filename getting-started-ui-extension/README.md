# Getting Started UI Extension

Simple integration that includes one project context menu UI extension that greets the user and ask them to click a button.

You can build this UI extension, step-by-step, by following our official [Getting Started guide](https://developer.todoist.com/ui-extensions#getting-started).

## Local development

### Run your integration service

```shell
npm install
npm run dev
```

## Expose your localhost

In order for Todoist to be able to communicate with your integration, we need to expose your service to the internet. There are a couple of tools available to create this kind of tunnel:

- [`ngrok`](https://ngrok.com/)
- [`localtunnel`](https://www.npmjs.com/package/localtunnel)
- [`Cloudflare Tunnels`](https://www.cloudflare.com/en-gb/products/tunnel/)

```shell
ngrok http 3000
```

For example, if you choose to use `ngrok`, you'll be running some variation of the following command (we chose to listen on port 3000):

Take note of the URL exposed by your tool of choice, as you'll need it in the next step (i.e. `https://my-extension-service`).

## Create a Todoist App

1. Visit the [App Management Console](https://todost.com/app_console) (you'll be prompted to log in if you're not already)
2. Click "Create a new App" and insert a name in the "App name" field (i.e. "My first app")
3. In the `UI Extensions` section, click "Add a new UI extension":
    * Give it a name (i.e. "Greet me!")
    * Select "Context menu" as the "Extension type" (and "Project" as the "Context type") 
    * Point "Data exchange endpoint URL" to your service URL followed by `/process` (or the endpoint name you chose when [creating your own integrations service](#create-your-own-integrations-service)). This value in this field might look something like `https://my-extension-service/process`
4. In the `Installation` section, click on the `Install for me` button

## Use your UI Extension

1. Visit [Todoist](https://todost.com)
2. Select any of your Todoist projects (or create a new one)
3. Click on the context menu icon of that project, select "Integrations" and finally select your UI Extension from the list (i.e. "Greet me!")
    - You should see a UI with a text and a button. If you click the button, you should see a notification
