import * as dotenv from 'dotenv'

import { Email } from '../email/email.interface'

dotenv.config()

const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendEmail(data: Email) {
  sendgrid
    .send(data)
    .then(() => {
      console.log(`SendgridService: Message sent to ${data.to}`)
    })
    .catch((error: any) => {
      console.log(error.response.body)
    })
}
