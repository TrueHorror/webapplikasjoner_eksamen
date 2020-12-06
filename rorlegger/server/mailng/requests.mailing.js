const transporter = require('./mail.config')


  exports.sendConfirmationMail = async function (email, text) {
    const mail = {
      from: process.env.GMAIL_ADDRESS,
      to: email,
      subject: 'Forespørsel mottatt',
      text: 'Forespørsel mottatt: \n\n' +
        text + '\n\n' +
        'Vi vil svare så fort vi kan, med vennlig hilsen Trond og Fredrik!',
      html: `<h1>Forespørsel mottatt!</h1>
             <p>${text}</p>
             <p>Vi vil svare så fort vi kan, med vennlig hilsen Trond og Fredrik!</p>`
    }
    try {
      transporter.sendMail(mail)
      console.log("email sent");
    } catch (e) {
      throw Error('Could not send mail')
    }
  }
