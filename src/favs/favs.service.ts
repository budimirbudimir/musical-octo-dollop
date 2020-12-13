/**
 * Data Model Interfaces
 */

import { Data, scrapeSubreddit } from '../common/snoowrap-service'
import * as RecipientsService from '../recipients/recipients.service'
import { Recipient } from '../recipients/recipient.interface'

/**
 * Service Methods
 */

export const findByUserId = async (userId: number): Promise<Data[]> => {
  const rec: Recipient = await RecipientsService.find(userId)

  const promises = await rec.subs.map((subName: string) =>
    scrapeSubreddit(subName)
  )

  return Promise.all(promises).then((results) => {
    return results.map((r) => r)
  })
}
