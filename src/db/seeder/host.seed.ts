import type { DB } from '..'
export const host = async (Host: DB['Host']) => {
  // await Host.findOrCreate({ where: { id: 1 }, defaults: { host: 'example1.com', user: 'alwan', divisi: 'IT' } })
  await Host.bulkCreate([{ host: 'exampel1.com', user: 'alwan', divisi: 'IT' }], {
    updateOnDuplicate: ['user', 'divisi']
  })
}
