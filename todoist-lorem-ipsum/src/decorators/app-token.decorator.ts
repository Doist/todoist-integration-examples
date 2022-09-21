import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { containsTwistOrTodoistAppTokenHeaders, getAppTokenHeader } from '../utils/header-utils'

import type { Request } from 'express'

export const AppToken = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const { headers } = ctx.switchToHttp().getRequest<Request>()

    return containsTwistOrTodoistAppTokenHeaders(headers)
        ? (getAppTokenHeader(headers) as string)
        : undefined
})
