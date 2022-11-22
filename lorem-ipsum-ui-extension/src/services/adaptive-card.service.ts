import { Choice, ChoiceSetInput, DoistCard, SubmitAction, TextBlock, TextInput } from '@doist/ui-extensions-core'

export class AdaptiveCardService {

    createInputCard(): DoistCard {
        const card = new DoistCard()

        card.addItem(
            TextBlock.from({
            text: 'How many tasks do you want to add?',
        }))

        const choiceSet = new ChoiceSetInput()
        choiceSet.id = 'Input.Choice'
        choiceSet.choices = [
            new Choice('1'),
            new Choice('2'),
            new Choice('3'),
        ]
        choiceSet.defaultValue = '1'

        card.addItem(choiceSet)

        card.addAction(
            SubmitAction.from({
                id: 'Action.Submit',
                title: "Add tasks",
                style: 'positive',
            }),
        )

        return card
    }

    createSettingsCard(): DoistCard {
        const card = new DoistCard()

        card.addItem(
            TextBlock.from({
            text: 'Add here any settings that the user might want to control',
        }))

        return card
    }
}
