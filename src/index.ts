/**
 * Required External Modules
 */

import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cron from 'node-cron'

import * as FavService from './favs/favs.service'
import * as RecipientsService from './recipients/recipients.service'
import { send as sendSendgridEmail } from './email/email.service'
import { recipientsRouter } from './recipients/recipients.router'
import { favsRouter } from './favs/favs.router'
import { errorHandler } from './middleware/error.middleware'
import { notFoundHandler } from './middleware/notFound.middleware'
import favsIntoText from './utils/favsIntoText'
import favsIntoHtml from './utils/favsIntoHtml'
import { Data } from './common/snoowrap-service'

dotenv.config()

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)
const CRON_EVERY_MINUTE = '* * * * *'
const CRON_EVERY_9AM = '0 8 * * *'

const app = express()

/**
 *  App Configuration
 */

app.use(helmet())
app.use((req, res, next) => {
  next()
}, cors({ maxAge: 84600 }))
app.use(express.json())

app.use('/recipients', recipientsRouter)
app.use('/favs', favsRouter)

app.use(errorHandler)
app.use(notFoundHandler)

/**
 * Server Activation
 */

app.get('/', (req, res) => res.send('This is the server API root.'))

// Email cron job, schedules newsletter sending
cron.schedule(CRON_EVERY_MINUTE, async () => {
  const allRecipients = await RecipientsService.findAll()

  await Object.keys(allRecipients).forEach(async (recipientId: string) => {
    const userId: number = parseInt(recipientId)

    // Bail out if user is not subscribed
    if (!allRecipients[userId].subscribed) return

    const favs: Data[] = await FavService.findByUserId(userId)
    const asText: string = await favsIntoText(favs)
    const asHtml: string = await favsIntoHtml(favs)

    sendSendgridEmail({
      to: allRecipients[userId].email,
      from: process.env.SENDGRID_VERIFIED_SENDER as string,
      subject: `Budimir's Reddit Nesletter for ${allRecipients[userId].name}`,
      text: asText,
      html: asHtml,
    })
  })
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
