import { Router } from "express";
const router = Router();

router.get("/:id", async (req, res) => {
    const user = await req.context.models.User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found." });
    return res.send(user);
});


router.post("/", async (req, res) => {
    try {
        const user = await req.context.models.User.createUser(req.body);
        return res.status(201).send(user);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const user = await req.context.models.User.updateUser(req.params.id, req.body);
        if (!user) return res.status(404).send({ message: "User not found." });
        return res.send(user);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await req.context.models.User.deleteById(req.params.id);
        if (!user) return res.status(404).send({ message: "User not found." });
        return res.send({ message: "User deleted." });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

export default router;