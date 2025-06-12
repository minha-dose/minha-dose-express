import { Router } from "express";
import models from "../models"
const router = Router();


router.get("/:id", async (req, res) => {
    try {
        const { Ubs } = req.context.models;
        const ubs = await Ubs.findById(req.params.id);
        if (!ubs) return res.status(404).send({ message: "Ubs not found." });
        return res.send(ubs);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


router.get("/", async (req, res) => {
    const allUbs = await req.context.models.Ubs.findAllUbs();
    return res.send(allUbs);
});

router.get('/:id/vaccins', async (req, res) => {
    const ubsId = req.params.id;

    try {
        const vaccins = await models.Ubs.findVaccinByUbsId(ubsId);
        if (!vaccins) {
            return res.status(404).json({ error: 'UBS not found' });
        }

        res.json(vaccins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/", async (req, res) => {
    try {
        const novaUbs = await req.context.models.Ubs.createUbs(req.body, req.context.models);
        res.status(201).json(novaUbs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar UBS" });
    }
});

router.put("/:ubsId", async (req, res) => {
    try {
        const updateUbs = await req.context.models.Ubs.updateUbs(
            req.params.ubsId,
            req.body
        );
        if (!updateUbs) return res.status(404).json({ message: "Ubs not found." });
        return res.json(updateUbs);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.delete("/:ubsId", async (req, res) => {
    try {
        const deleteUbs = await req.context.models.Ubs.deleteById(req.params.ubsId);
        if (!deleteUbs) return res.status(404).json({ message: "Ubs not found." });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get("/search", async (req, res) => {
    const { ubsName } = req.query;
    if (!ubsName) return res.status(400).send({ message: "Missing query param: ubsName" });

    const results = await req.context.models.Ubs.findByName(ubsName);

    if (results.length === 0) {
        return res.status(404).send({ message: "No UBS found with this name." });
    }
    return res.send(results);
});

export default router;