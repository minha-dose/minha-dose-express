import { Router } from "express";
const router = Router();

/**
 * 🔎 Buscar por nome (query param ?name=xxx)
 */
router.get("/findByName/", async (req, res) => {
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

/**
 * 🔎 Buscar por ID
 */
router.get("/:id", async (req, res) => {
    try {
        const vaccin = await req.context.models.Vaccin.findById(req.params.id);
        if (!vaccin) return res.status(404).send({ message: "Vaccin not found." });
        return res.send(vaccin);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

/**
 * 📋 Buscar todos
 */
router.get("/", async (req, res) => {
    try {
        const vaccins = await req.context.models.Vaccin.findAllVaccins();
        return res.send(vaccins);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

/**
 * ➕ Criar vacina global (somente name esperado)
 */
router.post("/", async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({ error: "Field 'name' is required." });
        }

        const vaccin = await req.context.models.Vaccin.createVaccin(req.body);
        return res.status(201).send(vaccin);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

/**
 * ✏ Atualizar parcialmente (nome)
 */
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

/**
 * ❌ Deletar
 */
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