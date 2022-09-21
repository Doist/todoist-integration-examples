import { DoistCard, SubmitAction, TextInput } from '@doist/ui-extensions-core'

import { Injectable } from '@nestjs/common'

@Injectable()
export class AdaptiveCardService {

    createEmptyCard(): DoistCard {
        const emptyCard = new DoistCard()
        emptyCard.doistCardVersion = '0.3'

        return emptyCard
    }

    createSettingsCard(): DoistCard {
        const card = this.createEmptyCard()

        const settingsInput = new TextInput()
        settingsInput.id = 'SettingsInput'
        settingsInput.isRequired = false
        settingsInput.label = 'Write here whatever you want'
        settingsInput.placeholder = 'Tell me something'

        card.addItem(settingsInput)

        const saveButton = new SubmitAction()
        saveButton.id = 'SettingsInput.Reload' // Fake button that doesn't go anywhere
        saveButton.title = 'Reload'
        saveButton.style = 'positive'

        card.addAction(saveButton)

        return card
    }
}
