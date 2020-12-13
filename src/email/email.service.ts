/**
 * Data Model Interfaces
 */

import { Email } from './email.interface'
import { sendEmail } from '../common/sendgrid-service'

/**
 * In-Memory Store
 */

const fallbackData: Email = {
  to: process.env.SENDGRID_VERIFIED_SENDER as string,
  from: process.env.SENDGRID_VERIFIED_SENDER as string,
  subject: 'Reddit Newsletter Test',
  text: "Let's see how this will work out!",
  html: "<p>Let's see how this will work out!</p>",
}

/**
 * Helper Methods
 */

const validateEmailData = (data: Email) => {
  if (!data.to && data.to !== '') return false
  if (!data.from && data.from !== '') return false
  if (!data.subject && data.subject !== '') return false
  if (!data.text && data.text !== '') return false
  if (!data.html && data.html !== '') return false

  console.log('EmailService: E-mail validated.')
  return true
}

/**
 * Service Methods
 */

export const send = async (passedData?: Email): Promise<any> => {
  // FIXME Not very graceful, but work for this test scenario
  const conditionalData = passedData || fallbackData

  // Send email
  if (validateEmailData(conditionalData)) {
    try {
      sendEmail(conditionalData)
      return
    } catch (err) {
      console.error(`EmailService: sendEmail function failed: ${err}`)
    }
  }

  console.error('EmailService: E-mail data is not valid!')
}
