import { Router } from "express";
import { sendResetEmail } from "../services/emailService.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await req.context.models.User.findUserByEmail(email);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

        const code = crypto.randomInt(1000, 9999).toString();
        const expireAt = new Date(Date.now() + 10 * 60 * 1000); // expira em 10 min

        await req.context.models.PasswordReset.create({ email, code, expireAt });
        await sendResetEmail(email, code);

        res.json({ message: "Código de recuperação enviado para o e-mail informado." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/verify-code", async (req, res) => {
    const { email, code } = req.body;

    try {
        const reset = await req.context.models.PasswordReset.findOne({
            where: { email, code },
        });

        if (!reset) {
            return res.status(400).json({ error: "Código inválido" });
        }

        if (reset.expireAt < new Date()) {
            await reset.destroy();
            return res.status(400).json({ error: "Código expirado. Solicite outro." });
        }

        const tmpToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "5m" }
        );

        res.json({token: tmpToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        const user = await req.context.models.User.findUserByEmail(email);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado." });
        user.password = newPassword;
        await user.save();

        await req.context.models.PasswordReset.destroy({ where: { email } });
        res.json({ message: "Senha atualizada!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;