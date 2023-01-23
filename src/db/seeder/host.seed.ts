export const host = async (Host: DB['Host']) => {
  // await Host.findOrCreate({ where: { id: 1 }, defaults: { host: 'example1.com', user: 'alwan', divisi: 'IT' } })
  await Host.bulkCreate([{ host: 'exampel12.com', user: 'alwan', divisi: 'IT' }], {
    updateOnDuplicate: ['user', 'divisi']
  })
}
