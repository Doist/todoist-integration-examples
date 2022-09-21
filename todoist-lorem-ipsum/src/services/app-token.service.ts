import { Injectable, Scope } from '@nestjs/common'

import type { AppAuthToken } from '../types'

/**
 * AppTokenService is a service that can be injected into any other class
 * to give it access to the app token provided by Todoist/Twist.
 *
 * If you are importing the `CoreModule` then you already have access to this
 * and you do not need to put it as a provider.
 */
@Injectable({
    scope: Scope.REQUEST,
})
export class AppTokenService {
    private _appToken: AppAuthToken | undefined
    /**
     * This is the app token that comes from either Todoist or Twist. The token will only
     * be populated if the extension developer has requested scopes for the integration
     * in the relevant app console
     */
    get appToken(): AppAuthToken | undefined {
        return this._appToken
    }

    set appToken(appToken: AppAuthToken | undefined) {
        this._appToken = appToken
    }
}
