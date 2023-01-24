export const host = async (Host: DB['Host']) => {
  // await Host.bulkCreate([{ host: 'exampel12.com', user: 'alwan', divisi: 'IT' }], {
  //   updateOnDuplicate: ['user', 'divisi']
  // })
  const [host, isCreated] = await Host.findOrCreate({ where: { id: 1 }, defaults: { hostName: 'example1.com', user: 'alwan', divisi: 'IT' } })
  // await host.createPingLog({ isConnect: false })
}
