import nodemailer from "nodemailer";

export async function sendResetEmail(email, code) {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE === "true",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Minha Dose" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Recuperação de senha",
        text: `Olá! Seu código de recuperação é: ${code}`,
    }

    await transporter.sendMail(mailOptions);
}