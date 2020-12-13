// src/recipients/recipient.interface.ts

export interface Recipient {
  id: number
  name: string
  username: string
  subs: string[]
  email: string
  subscribed: boolean
}
