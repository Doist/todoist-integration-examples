import { Module } from '@nestjs/common'
import { AppController } from '../controllers/app.controller';
import { ActionsService } from '../services/actions.service';
import { AdaptiveCardService } from '../services/adaptive-card.service';
import { ActionsServiceBase } from '../services/base-actions.service';
import { AppTokenModule } from './app-token.module';
import { ConfigurationModule } from './configuration.module';
import { CoreModule } from './core.module';

@Module({
    imports: [
        ConfigurationModule,
        CoreModule,
        // TODO no ErrorModule for now
    ],
    providers: [
        AdaptiveCardService,
        {
            provide: ActionsServiceBase, // TODO not sure if this is actually needed or if we can put everything inside the "real" ActionsService
            useExisting: ActionsService,
        },
        ActionsService,
    ],
    controllers: [AppController],
    exports: [
        AdaptiveCardService,
        ActionsService,
    ],
})
export class AppModule {}
