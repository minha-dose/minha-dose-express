import { Router } from "express";
const router = Router();

router.get("/:id", async (req, res) => {
    const contact = await req.context.models.Contact.findById(req.params.id);
    if (!contact) return res.status(404).send({ message: "Contact not found." });
    return res.send(contact);
});

router.get("/", async (req, res) => {
    const contacts = await req.context.models.Contact.findAllContacts();
    return res.send(contacts);
});

router.get("/users/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const contact = await req.context.models.Contact.findContactByUserId(userId);
        if (!contact) {
            return res.status(404).send({ message: "Contact not found." });
        }
        return res.send(contact);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.get("/ubs/:ubsId", async (req, res) => {
    const { ubsId } = req.params;
    try {
        const contact = await req.context.models.Contact.findContactByUbsId(ubsId);
        if (!contact) {
            return res.status(404).send({ message: "Contact not found." });
        }
        return res.send(contact);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

export default router;
