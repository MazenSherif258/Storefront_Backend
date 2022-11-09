import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import db from './providers/database'

const app = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())

app.get('/', async function (_req: Request, res: Response) {
    const result = await db.query('SELECT * from persons');
    res.status(200).json({ status: 200, response: {
        msg: "Success",
        data: result.rows
    } });
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
