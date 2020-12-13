/**
 * Data Model Interfaces
 */

import { Recipient } from './recipient.interface'
import { Recipients } from './recipients.interface'

/**
 * In-Memory Store
 */

const recipients: Recipients = {
  1: {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    subs: ['worldnews', 'technology', 'funny'],
    email: process.env.SENDGRID_VERIFIED_SENDER as string,
    subscribed: true,
  },
  2: {
    id: 2,
    name: 'Jane Doe',
    username: 'janedoe',
    subs: ['technology', 'funny'],
    email: process.env.SENDGRID_VERIFIED_SENDER as string,
    subscribed: true,
  },
  3: {
    id: 3,
    name: 'Jimmy Doe',
    username: 'jimmydoe',
    subs: ['funny'],
    email: process.env.SENDGRID_VERIFIED_SENDER as string,
    subscribed: false,
  },
}

/**
 * Service Methods
 */

export const findAll = async (): Promise<Recipients> => {
  return recipients
}

export const find = async (id: number): Promise<Recipient> => {
  const record: Recipient = recipients[id]

  if (record) return record

  throw new Error('No record found')
}

export const create = async (newRecipient: Recipient): Promise<void> => {
  const id = new Date().valueOf()

  recipients[id] = {
    ...newRecipient,
    id,
  }
}

export const update = async (updatedRecipient: Recipient): Promise<void> => {
  if (recipients[updatedRecipient.id]) {
    recipients[updatedRecipient.id] = updatedRecipient
    return
  }

  throw new Error('No record found to update')
}

export const remove = async (id: number): Promise<void> => {
  const record: Recipient = recipients[id]

  if (record) {
    delete recipients[id]
    return
  }

  throw new Error('No record found to delete')
}
