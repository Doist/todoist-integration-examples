import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { PingController } from '../controllers/ping.controller'

import { AppTokenModule } from './app-token.module'

@Module({
    controllers: [PingController],
    imports: [HttpModule, AppTokenModule],
    exports: [HttpModule, AppTokenModule],
})
export class CoreModule {}
