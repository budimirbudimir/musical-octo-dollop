/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express'

import * as FavService from './favs.service'
import { DataEntry } from '../common/snoowrap-service'

/**
 * Router Definition
 */

export const favsRouter = express.Router()

/**
 * Controller Definitions
 */

// GET favs/:id
favsRouter.get('/:id', async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10)

  try {
    const favs = await FavService.findByUserId(id)

    let responseData: any = {}
    favs.forEach((fCat: DataEntry[]) => {
      responseData[fCat[0].sub] = fCat
    })

    res.status(200).send(responseData)
  } catch (e) {
    res.status(404).send(e.message)
  }
})
