import { Router } from "express";
const router = Router();

router.get("/availableTime", async (req,res) => {
    try{
        const {date, ubsId} = req.query;
        if(!date || !ubsId)
            return res.status(400).json({error: "Parâmetros 'date' e 'ubsId' são obrigatórios"});

        const freeTimes = await req.context.models.Appointment.getAvailableTimes(date, ubsId);
        res.json({date, freeTimes});
    }catch(error){
        res.status(500).json({error: error.message});
    }
})

router.get("/:id", async (req, res) => {
    try {
        const appointment = await req.context.models.Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).send({ message: "Appointment not found." });
        return res.send(appointment);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const appointments = await req.context.models.Appointment.findAllAppointments();
        return res.send(appointments);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.get("/users/:userId", async (req, res) => {
    try {
        const appointments = await req.context.models.Appointment.findByUserId(req.params.userId);
        if (!appointments || appointments.length === 0) {
            return res.status(404).send({ message: "No appointments found for this user." });
        }
        return res.send(appointments);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const appointment = await req.context.models.Appointment.createAppointment(req.body);
        return res.status(201).send(appointment);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.patch("/:id/status", async (req, res) => {
    try {
        const updated = await req.context.models.Appointment.updateStatus(req.params.id, req.body.status);
        if (!updated) return res.status(404).send({ message: "Appointment not found." });
        return res.send(updated);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await req.context.models.Appointment.deleteById(req.params.id);
        if (!deleted) return res.status(404).send({ message: "Appointment not found." });
        return res.send(deleted);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

export default router;