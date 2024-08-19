import nodemailer from 'nodemailer';
import 'dotenv/config';

export const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ADDRESS,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"The Second Chance Foundation" <${process.env.GMAIL_ADDRESS}>`, 
        to: email, 
        subject: title, 
        html: body,
    };

    // Sending emails to users
    let info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};