"use server";

import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";

import type { SendMailParams } from "./types";
import { env } from "../env";

const ADMIN_EMAIL_ADDRESS = "vdt5snet@gmail.com";

const oAuth2Client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
);
oAuth2Client.setCredentials({
  refresh_token: env.GOOGLE_REFRESH_TOKEN,
});

export async function sendMailAction(input: SendMailParams) {
  const { email, name, message } = input;
  const response = await oAuth2Client.getAccessToken();
  const accessToken = response.token;
  if (accessToken) {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: ADMIN_EMAIL_ADDRESS,
        accessToken: accessToken,
        refreshToken: env.GOOGLE_REFRESH_TOKEN,
      },
    });

    return await transport.sendMail({
      // to,
      subject: `Contact from VyDuctan`,
      html: `<div>
                 <b>Contact:</b> ${name} - ${email}
              </div>
              <p>
                <b>Message</b>: ${message}
              </p>
              <a href="#">VyDucTan</a>`,
    });
  }
  return true;
}
