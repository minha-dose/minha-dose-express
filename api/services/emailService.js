import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendResetEmail(email, code) {

    const msg = {
        to: email,
        from: process.env.MAIL_USER,
        subject: 'Recuperação de senha',
        text: `Olá! Seu código de recuperação é: ${code}`
    }

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
}