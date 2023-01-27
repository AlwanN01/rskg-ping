import tryCatch from '../utils/tryCatch'
import db from '../models'
import resJson from '../helper/resJson'
import { createHostSchema, searchHostSchema } from '../middlewares/validations/Host.middleware'

const createHost = tryCatch(createHostSchema, async (req, res) => {
  const host = await db.Host.create({ user: 'dara', hostName: 'example3.com', divisi: 'IT' })
  resJson(res, 'Created', host)
})

const searchHost = tryCatch(searchHostSchema, async (req, res) => {
  const host = await db.Host.findOne({ where: { hostName: req.body.hostName } })
  if (!host) return resJson(res, 'Not Found')
  return resJson(res, 'Created', host)
})
