import type {
    DoistCardActionType,
    DoistCardRequest,
    DoistCardResponse,
} from '@doist/ui-extensions-core'
import type { TypedMethodDecorator } from './typed-method-decorator'

export const ACTION_METADATA = 'ACTION'

export type ActionMetadata = {
    actionType: DoistCardActionType
    actionId?: string
}

type ActionHandler = (request: DoistCardRequest) => Promise<DoistCardResponse>

/**
 * Decorator that marks a method as an action handler. Matches `actionType: 'submit'`.
 * @param actionId The action ID.
 */
export function Submit({ actionId }: { actionId: string }): TypedMethodDecorator<ActionHandler> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (_target, _key, descriptor: TypedPropertyDescriptor<any>) => {
        Reflect.defineMetadata(
            ACTION_METADATA,
            { actionType: 'submit', actionId },
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            descriptor.value,
        )

        return descriptor
    }
}
