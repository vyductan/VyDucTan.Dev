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
type RessultData = {
  success: boolean;
};

const post = async (req: NextApiRequest, res: NextApiResponse<RessultData>) => {
  try {
    const { name, email, subject, message }: MailItem = JSON.parse(req.body);

    const transporter = nodemailder.createTransport({
      host: "smtp.zoho.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.ZOHO_EMAIL_ADDRESS,
        pass: process.env.ZOHO_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL_ADDRESS,
      to: process.env.RECEIVE_EMAIL,
      subject: subject,
      html: `<h2>VyDucTan.Me Contact</h2>
        <h3>User: ${name} - : ${email}</h3>
            <p>Message: ${message}</p>`,
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
  // res.status(404).end();
}
