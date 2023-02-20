import tryCatch from '../utils/tryCatch'
import db from '../models'
import resJson from '../helper/resJson'
import { hostSchema, HostSchema } from '../validations/Host.middleware'
import { prevStatus } from '../app/ping'
import type { Projectable } from 'sequelize'
export const createHost = tryCatch(hostSchema, async (req, res) => {
  const host = await db.Host.create(req.body)
  resJson(res, 'Created', host)
})

export const updateHost = tryCatch(hostSchema, async (req, res) => {
  const host = await db.Host.update(req.body, { where: { id: req.body.id } })
  resJson(res, 'No Content')
})

export const findOneHost = tryCatch<HostSchema>(async (req, res) => {
  const host = await db.Host.findByPk(req.params.id)
  if (!host) return resJson(res, 'Not Found')
  resJson(res, 'OK', host)
})

export const findAllHost = tryCatch<HostSchema>(async (req, res) => {
  const isAllAttributes = JSON.parse(req.query.allAtributes! || 'false')
  if (isAllAttributes && typeof isAllAttributes == 'boolean')
    resJson(res, 'OK', await db.Host.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } }))
  else
    resJson(
      res,
      'OK',
      (await db.Host.findAll({ attributes: ['hostName'] })).map(host => host.hostName)
    )
})

export const deleteHost = tryCatch<HostSchema>(async (req, res) => {
  const isDeleted = await db.Host.destroy({ where: { hostName: req.query.hostName } })
  delete prevStatus[req.query.hostName]
  if (!isDeleted) return resJson(res, 'Not Found')
  resJson(res, 'No Content')
})
