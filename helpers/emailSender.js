
import nodemailer from 'nodemailer';

const sendMail = async (to, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'oqmeslufjugyffgd@ethereal.email',
      pass: 'kjwYFsNjzTWMSYCRmh',
    },
  });
  const mailOptions = {
    from: '"Politico" <account@poli-tico.herokuapp.com>',
    to,
    subject,
    html: message,
  };
  const info = await transporter.sendMail(mailOptions);
  // eslint-disable-next-line no-console
  console.log('Email Preview: ', nodemailer.getTestMessageUrl(info));
  return nodemailer.getTestMessageUrl(info);
};

export default sendMail;
