import { Router } from "express";
import models from "../models"
const router = Router();

router.post("/", async (req, res) => {
    try {
        const vaccinStock = await req.context.models.UbsVaccin.createUbsVaccin(req.body);
        return res.status(201).json(vaccinStock);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.get("/findVaccinByUbsId/:ubsId", async (req, res) => {
    try {
        const result = await req.context.models.UbsVaccin.findVaccinByUbsId(req.params.ubsId);
        if (!result || result.length === 0) return res.status(404).send({ message: "No records found." });
        return res.send(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.get("/findUbsVaccinByVaccinId/:vaccinId", async (req, res) => {
    try {
        const result = await req.context.models.UbsVaccin.findVaccinByVaccinId(req.params.vaccinId);
        if (!result || result.length === 0) return res.status(404).send({ message: "No records found." });
        return res.send(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.patch("/decrement/:id", async (req, res) => {
    try {
        const result = await req.context.models.UbsVaccin.decrementQuantity(req.params.id);
        return res.send(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await req.context.models.UbsVaccin.deleteUbsVaccin(req.params.id);
        return res.status(200).send(deleted);
    } catch (error) {
        if (error.message === "UbsVaccin not found") {
            return res.status(404).send({ message: error.message });
        }
        return res.status(400).send({ error: error.message });
    }
});

export default router;