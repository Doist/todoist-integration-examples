import { HttpException, Injectable } from '@nestjs/common'

import type {
    ContextMenuData,
    DoistCardRequest,
    DoistCardResponse,
} from '@doist/ui-extensions-core'

import { ActionsServiceBase } from './base-actions.service'
import { AppTokenService } from './app-token.service'
import { AdaptiveCardService } from './adaptive-card.service'

import { TodoistApi } from '@doist/todoist-api-typescript'

import { loremIpsum } from "lorem-ipsum";
import { Submit } from '../decorators/action-decorators'

@Injectable()
export class ActionsService extends ActionsServiceBase {
    
    constructor(
        private readonly adaptiveCardService: AdaptiveCardService,
        private readonly appTokenService: AppTokenService,
    ) {
        super()
    }

    async getInitialView(request: DoistCardRequest): Promise<DoistCardResponse> {
        if (request.extensionType === 'context-menu') {
            return this.addTasks(request)
        } else if (request.extensionType === 'composer') {
            return this.getContent(request)
        } else { // extensionType === 'settings'
            return this.getSettingsCard(request)
        }
    }

    async addTasks(request: DoistCardRequest): Promise<DoistCardResponse> | never {
        const appToken = this.appTokenService.appToken
        if (!appToken) {
            throw new HttpException('Missing authentication token', 400) // TODO check this
        }

        const { action } = request
        const contextData = action.params as ContextMenuData
        const todoistClient = new TodoistApi(appToken)

        const projectId = String(contextData.sourceId)

        try {
            await todoistClient.addTask({
                content: loremIpsum(),
                projectId: projectId,
            })
        } catch (error: unknown) {
            throw new HttpException('Todoist API issue', 400) // TODO check this
        }

        return {
            bridges: [
                {
                    bridgeActionType: 'finished',
                },
                {
                    bridgeActionType: 'display.notification',
                    notification: {
                        type: 'success',
                        text: "Task added",
                    },
                }
            ],
        }
    }

    async getContent(request: DoistCardRequest): Promise<DoistCardResponse> | never {
        const appToken = this.appTokenService.appToken
        if (!appToken) {
            throw new HttpException('Missing authentication token', 400) // TODO check this
        }

        return {
            bridges: [
                {
                    bridgeActionType: 'composer.append',
                    text: loremIpsum(),
                },
                {
                    bridgeActionType: 'finished',
                },
            ],
        }
    }

    @Submit({ actionId: 'SettingsInput.Reload' })
    async getSettingsCard(request: DoistCardRequest): Promise<DoistCardResponse> | never {
        const appToken = this.appTokenService.appToken
        if (!appToken) {
            throw new HttpException('Missing authentication token', 400) // TODO check this
        }

        const card = this.adaptiveCardService.createSettingsCard()
        return { card }
    }
}
