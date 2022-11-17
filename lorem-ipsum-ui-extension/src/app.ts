import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import type { DoistCardRequest } from '@doist/ui-extensions-core'
import { getAppToken } from './utils/app-token-utils'
import { ActionsService } from './services/actions.service'

dotenv.config()
const port = process.env.PORT
const token = process.env.VERIFICATION_TOKEN

const app = express()
const jsonParser = bodyParser.json()
 
const processPing = function (request: Request, response: Response, next: NextFunction) {
    response.send('pong')
}

const processRequest = async function (request: Request, response: Response, next: NextFunction) {

    // TODO Use the methods in app-token-utils to validate that the incoming request actually comes from Todoist
    // Something like the following code should work (to be cleaned and tested):
    /**
    import type { IncomingHttpHeaders } from 'http'

    function isRequestValid(headers: IncomingHttpHeaders, 
        yourVerificationToken: string): boolean {
        
        const hashedHeader = headers[ 'x-todoist-hmac-sha256']

        const hashedRequest = CryptoJS.HmacSHA256(
            buffer.toString('utf-8'), yourVerificationToken.trim(),
        ).toString(CryptoJS.enc.Base64)

        return hashedHeader === hashedRequest
    }
     */

    const appToken = getAppToken(request)

    const doistRequest: DoistCardRequest = request.body as DoistCardRequest

    response.status(200).json(await new ActionsService().process(doistRequest, appToken))
}

app.get('/ping', processPing)
app.post('/process', jsonParser, processRequest)

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Lorem Ipsum UI Extension server running on port ${port}.`)
});
