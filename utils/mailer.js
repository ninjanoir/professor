const nodemailer = require('nodemailer')

const mailer = async ({ nom, email, message }) => {

    let response = {}

    let transporter = nodemailer.createTransport({
        host: 'mail.alainrobinson.yj.fr',
        port: 465,
        secure: true,
        auth: {
            user: 'contact@alainrobinson.yj.fr',
            pass: 'Vanina10&',
        },
    })

    let data = {
        from: `${nom} <${email}>`,
        to: 'alain.robinson@outlook.fr',
        subject: 'Message from CoachForYou',
        text: message,
        html: `<p>${message}</p>`,
    }

    let info = await transporter.sendMail(data)


    return info


}

module.exports = mailer
