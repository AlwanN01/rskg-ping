import { z } from 'zod'

const schema = z.object({
  host: z.string().url(),
  divisi: z.string()
})

export type HostSchema = z.infer<typeof schema>
