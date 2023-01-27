import tryCatch from '../utils/tryCatch'
import db from '../models'
import resJson from '../helper/resJson'
import { createHostSchema, searchHostSchema } from '../middlewares/validations/Host.middleware'

export const createHost = tryCatch(createHostSchema, async (req, res) => {
  const host = await db.Host.create({ user: 'dara', hostName: 'example3.com', divisi: 'IT' })
  resJson(res, 'Created', host)
})

export const searchHost = tryCatch(searchHostSchema, async (req, res) => {
  const host = await db.Host.findOne({ where: req.query })
  if (!host) return resJson(res, 'Not Found')
  resJson(res, 'OK', host)
})
