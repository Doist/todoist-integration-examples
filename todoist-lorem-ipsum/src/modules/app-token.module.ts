import { Global, Module } from '@nestjs/common'

import { AppTokenService } from '../services/app-token.service'

/**
 * AppTokenModule is a global module so only needs importing once (done via CoreModule)
 * This will allow use of the AppTokenService from anywhere within your service.
 */
@Global()
@Module({
    providers: [AppTokenService],
    exports: [AppTokenService],
})
export class AppTokenModule {}
