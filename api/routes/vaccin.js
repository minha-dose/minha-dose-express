import { Router } from "express";
const router = Router();

router.get("/:id", async (req, res) => {
    const vaccin = await req.context.models.Vaccin.findById(req.params.id);
    if (!vaccin) return res.status(404).send({ message: "Vaccin not found." });
    return res.send(vaccin);
});

router.get("/", async (req, res) => {
    const vaccins = await req.context.models.Vaccin.findAllVaccins();
    return res.send(vaccins);
});

router.get("/", async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).send({ error: "Query parameter 'name' is required." });
        }

        const vaccin = await req.context.models.Vaccin.findVaccinByName(name);

        if (!vaccin) return res.status(404).send({ message: "Vaccin not found." });

        return res.send(vaccin);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const vaccin = await req.context.models.Vaccin.createVaccin(req.body);
        return res.status(201).send(vaccin);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const vaccin = await req.context.models.Vaccin.findById(req.params.id);
        if (!vaccin) return res.status(404).send({ message: "Vaccin not found." });
        await vaccin.update(req.body);
        return res.send(vaccin);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const vaccin = await req.context.models.Vaccin.findById(req.params.id);
        if (!vaccin) return res.status(404).send({ message: "Vaccin not found." });
        await vaccin.destroy();
        return res.send({ message: "Vaccin deleted." });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

export default router;