import { Controller, Get, HttpCode } from '@nestjs/common'

@Controller()
export class PingController {
    @Get('ping')
    @HttpCode(200)
    ping(): string {
        return 'pong'
    }
}
