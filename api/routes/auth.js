import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const router = Router();

router.post("/login", async (req, res) => {

    try {
        const { email, password, recaptchaToken } = req.body;

        console.log("Captcha recebido: " + recaptchaToken);

        if (!recaptchaToken) {
            return res.status(400).json({ error: "Captcha não enviado" });
        }

        const verifyCaptcha = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`
        );



        const user = await req.context.models.User.findUserByEmail(email);
        if (!user) return res.status(404).json({ error: "User not found" });
        const correctPassword = await user.comparePassword(password);
        if (!correctPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        res.json({ token })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

export default router;