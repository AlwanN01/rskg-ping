import { z } from 'zod'

const schema = z.object({
  host: z.string().url(),
  isConnect: z.boolean()
})

export type PingLogSchema = z.infer<typeof schema>
