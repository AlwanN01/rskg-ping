import tryCatch from '../utils/tryCatch'
import db from '../models'
import resJson from '../helper/resJson'
import type { HostSchema } from '../middlewares/validations/Host.middleware'

const createHost = tryCatch<HostSchema>(async (req, res) => {
  const data = db.Host.getAttributes()
  const host = await db.Host.create({ user: 'dara', hostName: 'example3.com', divisi: 'IT' })

  return resJson(res, 'Created', host)
})
