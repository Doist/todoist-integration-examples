import type { Request } from 'express'
import CryptoJS from 'crypto-js'

import type { IncomingHttpHeaders } from 'http'
import { IncomingMessage } from 'http'

export const TODOIST_HASHED_HEADER = 'x-todoist-hmac-sha256'

export const TODOIST_APP_TOKEN_HEADER = 'x-todoist-apptoken'

export class IncomingMessageWithRawBody extends IncomingMessage {
    rawBody?: Buffer
}

export function cloneBuffer(buf: Buffer): Buffer {
    if (!Buffer.isBuffer(buf)) {
        throw new Error('Can only clone Buffer.')
    }

    const copy = Buffer.alloc(buf.length)
    buf.copy(copy)
    return copy
}

export function isRequestValid(request: IncomingMessageWithRawBody, verificationToken: string): boolean {
    const requestHeaders = request.headers
    const requestBody = request.rawBody

    if (!requestBody) {
        return false
    }

    const hashedHeader = requestHeaders['x-todoist-hmac-sha256']
    if (!hashedHeader) {
        return false
    }

    const hashedRequest = CryptoJS.HmacSHA256(
        requestBody.toString('utf-8'), 
        verificationToken
    ).toString(CryptoJS.enc.Base64)

    return hashedHeader === hashedRequest
}

export function containsTodoistAppTokenHeaders(headers: IncomingHttpHeaders): boolean {
    return Boolean(headers[TODOIST_APP_TOKEN_HEADER])
}

function getAppTokenHeader(request: Request): string | string[] | undefined {
    return request.header(TODOIST_APP_TOKEN_HEADER)
}

export function getAppToken(request: Request): string | undefined {
    return containsTodoistAppTokenHeaders(request.headers)
        ? (getAppTokenHeader(request) as string)
        : undefined
}
