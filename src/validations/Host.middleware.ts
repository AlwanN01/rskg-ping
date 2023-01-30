import { z } from 'zod'

export const hostSchema = z
  .object({
    id: z.coerce.number().optional(),
    hostName: z.string(),
    user: z.string(),
    divisi: z.string()
  })
  .strict()

export type HostSchema = z.infer<typeof hostSchema>
