import express, { Request, Response, NextFunction } from 'express'
import { json } from 'body-parser'
import dotenv from 'dotenv'
import {
    cloneBuffer,
    getAppToken,
    IncomingMessageWithRawBody,
    isRequestValid,
} from './utils/request-utils'
import { ActionsService } from './services/actions.service'

import type { DoistCardRequest } from '@doist/ui-extensions-core'
import type { ServerResponse } from 'http'

dotenv.config()
const port = process.env.PORT
const verificationToken = process.env.VERIFICATION_TOKEN

const app = express()

// This following piece of code makes sure that we can access the request body as rawBody
// (as well as in json format). The rawBody format is important to be able to validate
// if the request comes from Todoist and not from a potentially malicious actor.
app.use(
    json({
        verify: function rawBodyExtraction(
            req: IncomingMessageWithRawBody,
            _res: ServerResponse,
            buf: Buffer,
            _encoding: string,
        ): boolean {
            if (Boolean(req.headers['x-todoist-hmac-sha256']) && Buffer.isBuffer(buf)) {
                req.rawBody = cloneBuffer(buf)
            }
            return true
        },
    }),
)

const processPing = function (request: Request, response: Response, next: NextFunction) {
    response.send('pong')
}

const processRequest = async function (request: Request, response: Response, next: NextFunction) {
    if (!verificationToken || !isRequestValid(request, verificationToken)) {
        throw new Error('Request verification failed')
    }

    const appToken = getAppToken(request)

    const doistRequest: DoistCardRequest = request.body as DoistCardRequest

    response.status(200).json(await new ActionsService().process(doistRequest, appToken))
}

app.get('/ping', processPing)
app.post('/process', processRequest)

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Lorem Ipsum UI Extension server running on port ${port}.`)
})
