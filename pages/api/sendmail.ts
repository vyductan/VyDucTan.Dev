// https://spacejelly.dev/posts/how-to-send-emails-with-sendgrid-and-next-js-serverless-functions-for-a-contact-form/
import type { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";

type MailItem = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type RessultData = {
  success: boolean;
};

const post = async (req: NextApiRequest, res: NextApiResponse<RessultData>) => {
  try {
    const { name, email, subject, message }: MailItem = JSON.parse(req.body);

    if (!process.env.SENDGRID_API_KEY || !process.env.SEND_EMAIL) throw "ERROR";
    mail.setApiKey(process.env.SENDGRID_API_KEY);
    mail.send({
      from: process.env.SEND_EMAIL,
      to: process.env.RECEIVE_EMAIL,
      subject: subject,
      html: `<div><b>Contact:</b> ${name} - ${email}</div>
            <p><b>Message</b>: ${message}</p>
      <a href="vyductan.me">VyDucTan.Me</a>`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(200).json({ success: false });
  }
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RessultData>
) {
  switch (req.method) {
    case "POST":
      await post(req, res);
      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
}
