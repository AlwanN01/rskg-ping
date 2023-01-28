import { z } from 'zod'

const schema = z.object({
  hostId: z.coerce.number().optional(),
  isConnect: z.boolean()
})

export type PingLogSchema = z.infer<typeof schema>
