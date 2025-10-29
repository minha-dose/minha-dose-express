import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

router.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await req.context.models.User.findUserByEmail(email);
        if (!user) return res.status(404).json({ error: "User not found" });
        const correctPassword = await user.comparePassword(password);
        if (!correctPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        res.json({token})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

export default router;