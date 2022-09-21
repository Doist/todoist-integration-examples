import type { DoistCardAction } from '@doist/ui-extensions-core'

export function isInitial(action: DoistCardAction): boolean {
    return action.actionType === 'initial'
}

export function isSubmit(action: DoistCardAction, actionId: string | RegExp): boolean {
    if (action.actionType !== 'submit') {
        return false
    }

    if (actionId instanceof RegExp) {
        return action.actionId !== undefined && actionId.exec(action.actionId) != null
    } else {
        return action.actionId === actionId
    }
}
