import type { Request } from 'express'

export const TODOIST_HASHED_HEADER = 'x-todoist-hmac-sha256'
export const TODOIST_APP_TOKEN_HEADER = 'x-todoist-apptoken'

function containsTodoistAppTokenHeaders(request: Request): boolean {
    return Boolean(request.header(TODOIST_APP_TOKEN_HEADER))
}

function getAppTokenHeader(request: Request): string | string[] | undefined {
    return request.header(TODOIST_APP_TOKEN_HEADER)
}

export function getAppToken(request: Request): string | undefined {
    return containsTodoistAppTokenHeaders(request)
        ? (getAppTokenHeader(request) as string)
        : undefined
}
