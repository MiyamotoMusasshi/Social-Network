import nodemailer from "nodemailer";
import dotenv from "dotenv";
import random from "random";

dotenv.config();

export default async function sendEmailCode(recipient: string) {
  const trasporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAILADRESS,
      pass: process.env.EMAILPASS,
    },
  });

  const code = random.int(100000, 999999);

  const mailOptions = {
    from: {
      name: "Weave Official",
      address: process.env.EMAILADRESS ?? "",
    },
    to: recipient,
    subject: "Your confirmation code",
    text: `Your confirmation code: ${code} `,
  };

  trasporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    console.log(info);
  });

  return code;
}
