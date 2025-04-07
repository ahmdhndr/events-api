import ejs from "ejs";
import path from "node:path";
import nodemailer from "nodemailer";

import env from "@/env";
import { toGMT7 } from "@/utils/to-gmt-7";

const transporter = nodemailer.createTransport({
  host: env.EMAIL_SMTP_HOST,
  port: env.EMAIL_SMTP_PORT,
  secure: env.EMAIL_SMTP_SECURE, // true for port 465, false for other ports
  auth: {
    user: env.EMAIL_SMTP_USER,
    pass: env.EMAIL_SMTP_PASS,
  },
});

interface ISendMail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export async function sendMail({ from, to, subject, html }: ISendMail) {
  const result = await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });

  return result;
}

export async function renderMailHtml(template: string, data: any): Promise<string> {
  const content = await ejs.renderFile(
    path.join(__dirname, `templates/${template}`),
    {
      ...data,
      toGMT7,
    },
  );

  return content as string;
}
