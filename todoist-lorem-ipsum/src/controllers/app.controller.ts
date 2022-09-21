import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { AppToken } from '../decorators/app-token.decorator'
import { AppTokenService } from '../services/app-token.service'

import type { DoistCardRequest, DoistCardResponse } from '@doist/ui-extensions-core'
import type { AppAuthToken } from '../types'
import { ActionsService } from '../services/actions.service'

@Controller()
export class AppController {
    constructor(
        protected readonly actionsService: ActionsService,
        protected readonly appTokenService: AppTokenService,
    ) {}

    @Post('process')
    @HttpCode(200)
    process(
        @Body() request: DoistCardRequest,
        @AppToken() appToken: AppAuthToken,
    ): Promise<DoistCardResponse> {
        return this.processRequest(request, appToken)
    }

    @Post('settings')
    @HttpCode(200)
    settings(
        @Body() request: DoistCardRequest,
        @AppToken() appToken: AppAuthToken,
    ): Promise<DoistCardResponse> {
        return this.processRequest(request, appToken)
    }

    protected async processRequest(
        request: DoistCardRequest,
        appToken: AppAuthToken,
    ): Promise<DoistCardResponse> {
        this.appTokenService.appToken = appToken

        return this.actionsService.processRequest(request)
    }
}
