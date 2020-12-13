/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express'

import * as RecipientService from './recipients.service'
import { Recipient } from './recipient.interface'
import { Recipients } from './recipients.interface'

/**
 * Router Definition
 */

export const recipientsRouter = express.Router()

/**
 * Controller Definitions
 */

// GET items/
recipientsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items: Recipients = await RecipientService.findAll()

    res.status(200).send(items)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

// GET items/:id
recipientsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)

  try {
    const item: Recipient = await RecipientService.find(id)

    res.status(200).send(item)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

// POST items/
recipientsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const item: Recipient = req.body.item

    await RecipientService.create(item)

    res.sendStatus(201)
  } catch (e) {
    res.status(404).send(e.message)
  }
})

// PUT items/
recipientsRouter.put('/', async (req: Request, res: Response) => {
  try {
    const item: Recipient = req.body.item

    await RecipientService.update(item)

    res.sendStatus(200)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

// DELETE items/:id
recipientsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10)
    await RecipientService.remove(id)

    res.sendStatus(200)
  } catch (e) {
    res.status(500).send(e.message)
  }
})
