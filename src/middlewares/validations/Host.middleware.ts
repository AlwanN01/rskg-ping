import { z } from 'zod'

const schema = z.object({
  id: z.number().optional(),
  hostName: z.string().url(),
  user: z.string(),
  divisi: z.string()
})

export type HostSchema = z.infer<typeof schema>
