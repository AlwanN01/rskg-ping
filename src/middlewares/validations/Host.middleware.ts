import { z } from 'zod'

const hostSchema = z.object({
  id: z.coerce.number().optional(),
  hostName: z.string().url(),
  user: z.string(),
  divisi: z.string()
})

export const searchHostSchema = hostSchema.partial()
export const createHostSchema = hostSchema

export type HostSchema = z.infer<typeof hostSchema>
export type SearchHostSchema = z.infer<typeof searchHostSchema>
