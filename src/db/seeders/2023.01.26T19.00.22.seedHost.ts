export const up: MigrationFn = async ({ db: { Host } }) => {
  const host = await Host.bulkCreate([
    { hostName: 'example1.com', user: 'sample1', divisi: 'Informasi' },
    { hostName: 'example2.com', user: 'sample2', divisi: 'Informasi' },
    { hostName: 'example3.com', user: 'sample3', divisi: 'Informasi' },
    { hostName: '192.168.4.29', user: 'Alwan', divisi: 'IT' },
    { hostName: '192.168.4.6', user: 'Ari', divisi: 'IT' },
    { hostName: '192.168.4.7', user: 'Ayu', divisi: 'IT' }
  ])
  // await host.createPingLog({ isConnect: false })
}
export const down: MigrationFn = async ({ db }) => {
  await db.Host.destroy({ where: {} })
  await db.sequelize.query(`ALTER TABLE rskg_ping.hosts 
  AUTO_INCREMENT=1;
  `)
}
