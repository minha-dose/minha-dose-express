import { Router } from "express";
const router = Router();

router.get("/:id", async (req, res) => {
    const card = await req.context.models.VaccinCard.findById(req.params.id);
    if (!card) return res.status(404).send({ message: "VaccinCard not found." });
    return res.send(card);
});

router.get("/", async (req, res) => {
    const cards = await req.context.models.VaccinCard.findAllVaccinCards();
    return res.send(cards);
});

router.get("/user/:userId", async (req, res) => {
    try {
        const card = await req.context.models.VaccinCard.findByUserId(req.params.userId);
        if (!card) return res.status(404).send({ message: "VaccinCard not found." });
        return res.send(card);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const card = await req.context.models.VaccinCard.createCard(req.body);
        return res.status(201).send(card);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const updatedCard = await req.context.models.VaccinCard.updateCard(id, req.body);
        return res.status(200).send(updatedCard);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

export default router;