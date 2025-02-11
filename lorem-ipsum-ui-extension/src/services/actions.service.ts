import type {
    ContextMenuData,
    DoistCardRequest,
    DoistCardResponse,
} from '@doist/ui-extensions-core'

import { AdaptiveCardService } from './adaptive-card.service'

import { TodoistApi } from '@doist/todoist-api-typescript'

import { loremIpsum } from 'lorem-ipsum'

export class ActionsService {
    async process(
        request: DoistCardRequest,
        appToken: string | undefined,
    ): Promise<DoistCardResponse> {
        if (request.extensionType === 'context-menu' && request.action.actionType === 'initial') {
            return this.addTasksInputForm(request, appToken)
        } else if (
            request.extensionType === 'context-menu' &&
            request.action.actionType === 'submit' &&
            request.action.actionId === 'Action.Submit'
        ) {
            return this.addTasks(request, appToken)
        } else if (request.extensionType === 'composer') {
            return this.getContent(request, appToken)
        } else if (request.extensionType === 'settings') {
            return this.getSettings(request, appToken)
        } else {
            throw new Error('Something went wrong, unexpected request') // TODO Do something better here
        }
    }

    async addTasksInputForm(
        request: DoistCardRequest,
        appToken: string | undefined,
    ): Promise<DoistCardResponse> | never {
        if (!appToken) {
            throw new Error('No AppToken') // TODO Do something better here
        }

        // TODO Should not initialize this like this
        return { card: new AdaptiveCardService().createInputCard() }
    }

    async addTasks(
        request: DoistCardRequest,
        appToken: string | undefined,
    ): Promise<DoistCardResponse> | never {
        if (!appToken) {
            throw new Error('No AppToken') // TODO Do something better here
        }

        const { action } = request
        const inputs = action.inputs
        // Retrieve the user's preference re: number of tasks to add
        const tasksNumber = Number(inputs?.[`Input.Choice`])

        const contextData = action.params as ContextMenuData
        const projectId = String(contextData.sourceId)
        const todoistClient = new TodoistApi(appToken)
        try {
            // Issue calls to Todoist API to add the new tasks
            const addTaskCalls = [...Array(tasksNumber).keys()].map(() =>
                todoistClient.addTask({
                    content: loremIpsum(),
                    projectId: projectId,
                }),
            )
            await Promise.all(addTaskCalls)
        } catch (error: unknown) {
            console.log(error)
            throw error // TODO Do something better here
        }

        return {
            bridges: [
                {
                    bridgeActionType: 'finished',
                },
                {
                    bridgeActionType: 'request.sync',
                },
                {
                    bridgeActionType: 'display.notification',
                    notification: {
                        type: 'success',
                        text: 'Task(s) added.',
                    },
                },
            ],
        }
    }

    async getContent(
        request: DoistCardRequest,
        appToken: string | undefined,
    ): Promise<DoistCardResponse> | never {
        if (!appToken) {
            throw new Error('No AppToken') // TODO Do something better here
        }

        return {
            bridges: [
                {
                    bridgeActionType: 'finished',
                },
                {
                    bridgeActionType: 'composer.append',
                    text: loremIpsum(),
                },
            ],
        }
    }

    async getSettings(
        request: DoistCardRequest,
        appToken: string | undefined,
    ): Promise<DoistCardResponse> | never {
        if (!appToken) {
            throw new Error('No AppToken') // TODO Do something better here
        }

        return { card: new AdaptiveCardService().createSettingsCard() }
    }
}
