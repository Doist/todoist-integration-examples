import { DoistCard, DoistCardRequest, SubmitAction, TextBlock } from '@doist/ui-extensions-core'
import express, { Request, Response, NextFunction } from 'express'

const port = 3000
const app = express()
app.use(express.json())

const processRequest = async function (
    request: Request, response: Response, next: NextFunction
) {
    const doistRequest: DoistCardRequest = request.body as DoistCardRequest    
    const { action } = doistRequest

    if (action.actionType === 'initial') {
        // Initial call to the UI Extension, 
        // triggered by the user launching the extension

        // Prepare the Adaptive Card with the response
        // (it's going to be a form with some text and a button)
        const card = new DoistCard()
        card.addItem( 
            TextBlock.from({
                text: 'Hello, my friend!',
            })
        )
        card.addAction(
            // A button that triggers an Action when clicked
            SubmitAction.from({
                id: 'Action.Submit',
                title: 'Click me!',
                style: 'positive',
            })
        )

        // Send the Adaptive Card to the renderer
        response.status(200).json({card: card})

    } else if (action.actionType === 'submit' && action.actionId === 'Action.Submit') {
        // Sub-sequent call to the UI Extension, 
        // triggered by clicking the 'Click me!' button

        // Prepare the response
        // (this time it won't be an Adaptive Card, but two bridges)
        const bridges = [
            {
                bridgeActionType: 'display.notification',
                notification: {
                    type: 'success',
                    text: 'You clicked that button, congrats!',
                }
            },
            {
                bridgeActionType: 'finished',
            },
        ]

        // Send the bridges to the
        response.status(200).json({bridges: bridges})

    } else {
        // Throw an error
        throw Error('Request is not valid')
    }
}

app.post('/process', processRequest)

app.listen(port, () => {
    console.log(`UI Extension server running on port ${port}.`)
});
