'use server'

import { createServerAction } from '@vyductan/react'
import { OAuth2Client } from 'google-auth-library'
import { headers } from 'next/headers'
import nodemailer from 'nodemailer'

import { env } from '~/env.mjs'

import { SendMailSchema } from './_schema'

const ADMIN_EMAIL_ADDRESS = 'vdt5snet@gmail.com'

const oAuth2Client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET
)
oAuth2Client.setCredentials({
  refresh_token: env.GOOGLE_REFRESH_TOKEN,
})

export const sendMailAction = createServerAction(SendMailSchema)(
  async ({ name, email, message }) => {
    const response = await oAuth2Client.getAccessToken()
    const accessToken = response.token
    if (accessToken) {
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: ADMIN_EMAIL_ADDRESS,
          accessToken: accessToken,
          refreshToken: env.GOOGLE_REFRESH_TOKEN,
        },
      })

      const host = headers().get('host') || ''
      await transport.sendMail({
        // to,
        subject: `Contact from ${host}`,
        html: `<div>
                 <b>Contact:</b> ${name} - ${email}
              </div>
              <p>
                <b>Message</b>: ${message}
              </p>
              <a href="${host}">VyDucTan.Me</a>`,
      })
    }
  }
)

// export const sendMail = serverAction
//   .input(SendMailSchema)
//   .query(async ({ input }) => {
//     const { name, email, message } = input
//     const response = await oAuth2Client.getAccessToken()
//     const accessToken = response.token
//     if (accessToken) {
//       const transport = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           type: 'OAuth2',
//           user: ADMIN_EMAIL_ADDRESS,
//           accessToken: accessToken,
//           refreshToken: env.GOOGLE_REFRESH_TOKEN,
//         },
//       })
//
//       const host = headers().get('host') || ''
//       await transport.sendMail({
//         // to,
//         subject: `Contact from ${host}`,
//         html: `<div>
//                  <b>Contact:</b> ${name} - ${email}
//               </div>
//               <p>
//                 <b>Message</b>: ${message}
//               </p>
//               <a href="${host}">VyDucTan.Me</a>`,
//       })
//     }
//   })

// sendMail({ name: 'haha' }).data
// export const sendMailx = async ({
//   name,
//   email,
//   subject,
//   message,
// }: SendMailParams) => {
//   try {
//     const response = await oAuth2Client.getAccessToken()
//     const accessToken = response.token
//     if (accessToken) {
//       const transport = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           type: 'OAuth2',
//           user: ADMIN_EMAIL_ADDRESS,
//           accessToken: accessToken,
//           refreshToken: env.GOOGLE_REFRESH_TOKEN,
//         },
//       })
//       await transport.sendMail({
//         to,
//         subject,
//         html: `<div>
//                  <b>Contact:</b> ${name} - ${email}
//               </div>
//               <p>
//                 <b>Message</b>: ${message}
//               </p>
//               <a href="${headers().get('host')}">VyDucTan.Me</a>`,
//       })
//     }
//   } catch (error) {
//     console.log('error')
//   }
// }

// tôi có object const serverAction = {
//   input: <TParams extends string>(
//     schema: TParams
//   ) => {
//     return {
//       query: (
//         resolver: ({
//           input,
//         }: {
//           input: string
//         }) => TResult
//       ) => {
//         const input = “xx”
//         return (inputx: z.infer<typeof schema>) => {
//           const res = resolver({ input: inputx })
//           return {
//             data: res,
//           }
//         }
//       },
//     }
//   },
// }
//
// và định nghĩa const fn = serverAction.input(“a).query((x) => return result: number or string)
// làm sao khi gọi fn() thì có trả về kết quả của hàm có kiểu của  result
