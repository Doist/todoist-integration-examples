import type { IncomingHttpHeaders } from 'http'

export const TWIST_HASHED_HEADER = 'x-twist-hmac-sha256'
export const TODOIST_HASHED_HEADER = 'x-todoist-hmac-sha256'

export const TODOIST_APP_TOKEN_HEADER = 'x-todoist-apptoken'
export const TWIST_APP_TOKEN_HEADER = 'x-twist-apptoken'

export function containsTwistOrTodoistHeaders(headers: IncomingHttpHeaders): boolean {
    return Boolean(headers[TWIST_HASHED_HEADER]) || Boolean(headers[TODOIST_HASHED_HEADER])
}

export function getHashedHeader(headers: IncomingHttpHeaders): string | string[] | undefined {
    return headers[TWIST_HASHED_HEADER] || headers[TODOIST_HASHED_HEADER]
}

export function containsTwistOrTodoistAppTokenHeaders(headers: IncomingHttpHeaders): boolean {
    return Boolean(headers[TODOIST_APP_TOKEN_HEADER]) || Boolean(headers[TWIST_APP_TOKEN_HEADER])
}

export function getAppTokenHeader(headers: IncomingHttpHeaders): string | string[] | undefined {
    return headers[TODOIST_APP_TOKEN_HEADER] || headers[TWIST_APP_TOKEN_HEADER]
}
