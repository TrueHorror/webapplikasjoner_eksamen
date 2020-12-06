const nodemailer = require('nodemailer')

let transporter;
const isTesting = process.env.EMAIL_TESTING

if (isTesting){
  transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7765787088cfbf",
      pass: "567e3c60fc6085"
    }
  });
} else {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD
    }
  });
}

module.exports = transporter
