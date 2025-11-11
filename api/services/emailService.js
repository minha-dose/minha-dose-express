import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendResetEmail(email, code) {
    const msg = {
        to: email,
        from: process.env.MAIL_USER,
        subject: 'Recuperação de senha',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
                <h2 style="color: #2c3e50;">Olá!</h2>
                <p>Você solicitou a recuperação de senha. Use o código abaixo para continuar:</p>
                <div style="font-size: 24px; font-weight: bold; color: #e74c3c; margin: 20px 0;">
                    ${code}
                </div>
                <p>Se você não solicitou isso, ignore este e-mail.</p>
                <hr style="margin-top: 30px;">
                <p style="font-size: 12px; color: #7f8c8d;">Equipe Minha Dose.</p>
            </div>
        `
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
}