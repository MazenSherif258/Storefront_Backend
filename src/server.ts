import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import router from './routes'

const app = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())

app.use(router)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
