import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.NODEMAILER_NAME} <${process.env.NODEMAILER_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.messgae,
  };

  await transport.sendMail(message);
};

export default sendEmail;
