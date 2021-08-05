// https://spacejelly.dev/posts/how-to-send-emails-with-sendgrid-and-next-js-serverless-functions-for-a-contact-form/
import type { NextApiRequest, NextApiResponse } from "next";
import mail from "@sendgrid/mail";
import nodemailder from "nodemailer";

process.env.SENDGRID_API_KEY && mail.setApiKey(process.env.SENDGRID_API_KEY);

type MailItem = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
type Res = {
  success: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>
) {
  const { name, email, subject, message }: MailItem = JSON.parse(req.body);

  const transporter = nodemailder.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  transporter.sendMail(
    {
      to: process.env.RECEIVE_EMAIL,
      from: "contact@vyductan.me",
      subject: subject,
      text: message,
      html: `<div>${message}</div><p>Sent from:
      ${email}</p>`,
    },
    (e, d) => {
      if (e) {
        console.log(e);
      } else {
        console.log(d);
      }
    }
  );

  // if (!process.env.RECEIVE_EMAIL) return res.json({ success: false });
  // mail
  //   .send({
  //     to: process.env.RECEIVE_EMAIL,
  //     from: email,
  //     subject: subject,
  //     text: message,
  //     // html:
  //   })
  //   .then(() => {
  //     res.status(200).json({ success: true });
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
}
