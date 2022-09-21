import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { MetadataScanner } from '@nestjs/core'

import { ACTION_METADATA, ActionMetadata } from '../decorators/action-decorators'
import { isInitial } from '../utils/action-utils'

import type {
    DoistCardRequest,
    DoistCardResponse,
} from '@doist/ui-extensions-core'

export type ProcessorRequest = (request: DoistCardRequest) => boolean
export type ProcessorAction = (request: DoistCardRequest) => Promise<DoistCardResponse>

export type ActionProcessor = {
    check: ProcessorRequest
    action: ProcessorAction
}

@Injectable()
export abstract class ActionsServiceBase {
    private actionProcessors: ActionProcessor[] = []

    constructor() {
        this.addActionProcessors([
            {
                check: (request) => isInitial(request.action),
                action: (request) => this.getInitialView(request),
            },
        ])

        this.registerDecoratedActions()
    }

    async processRequest(request: DoistCardRequest): Promise<DoistCardResponse> {
        const { action } = request

        const actionProcessor = this.actionProcessors.find((processor) => processor.check(request))

        if (!actionProcessor) {
            const actionDetails = action.actionId
                ? `${action.actionType}.${action.actionId}`
                : action.actionType

            throw new HttpException(
                `${actionDetails} is not a valid action`,
                HttpStatus.BAD_REQUEST,
            )
        }

        return actionProcessor.action(request)
    }

    // Only this method is abstract, because depending on the integration, it may not need
    // the others but they can be overridden should they be required.
    abstract getInitialView(request: DoistCardRequest): Promise<DoistCardResponse>



    // TODO not sure if these two below are actually absolutely needed
    // would like to be able to remove them to lower complexity
    protected addActionProcessors(actions: ActionProcessor[]): void {
        actions.forEach((a) => this.actionProcessors.push(a))
    }

    private registerDecoratedActions() {
        const metadataScanner = new MetadataScanner()
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const instance: ActionsServiceBase = this
        const instancePrototype = Object.getPrototypeOf(this) as typeof ActionsServiceBase
        metadataScanner.scanFromPrototype(instance, instancePrototype, (methodName) => {
            const instanceCallback = instance[methodName as keyof ActionsServiceBase]

            const prototypeCallback = instancePrototype[methodName as keyof typeof ActionsServiceBase]

            const actionMetadata: ActionMetadata | undefined = Reflect.getMetadata(
                ACTION_METADATA,
                prototypeCallback,
            ) as ActionMetadata | undefined

            if (actionMetadata) {
                const { actionType, actionId } = actionMetadata

                this.addActionProcessors([
                    {
                        check: (request) =>
                            request.action.actionType === actionType &&
                            (actionId === undefined || actionId === request.action.actionId),
                        action: (request) => instanceCallback.apply(instance, [request]),
                    },
                ])
            }
        })
    }
}
