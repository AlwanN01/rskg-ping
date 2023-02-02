import { z } from 'zod'

export const hostSchema = z
  .object({
    id: z.coerce.number().optional(),
    hostName: z.string().min(1),
    user: z.string().min(1),
    divisi: z.string().min(1)
  })
  .strict()

export type HostSchema = z.infer<typeof hostSchema>
