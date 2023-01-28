import tryCatch from '../utils/tryCatch'
import db from '../models'
import resJson from '../helper/resJson'
import { hostSchema, HostSchema } from '../middlewares/validations/Host.middleware'

export const createHost = tryCatch(hostSchema, async (req, res) => {
  const host = await db.Host.create({ user: 'dara', hostName: req.body.hostName, divisi: 'IT' })
  resJson(res, 'Created', host)
})

export const updateHost = tryCatch(hostSchema, async (req, res) => {
  const host = await db.Host.update({ user: req.body.user }, { where: { id: req.params?.id } })
  resJson(res, 'Created', host)
})

export const searchHost = tryCatch<HostSchema>(async (req, res) => {
  const host = await db.Host.findByPk(req.params.id)
  if (!host) return resJson(res, 'Not Found')
  resJson(res, 'OK', host)
})
