import { z } from 'zod'

export const SendMailSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  message: z.string().nonempty(),
})

export type SendMailParams = z.infer<typeof SendMailSchema>
