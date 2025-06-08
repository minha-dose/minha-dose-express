import { Router } from "express";
const router = Router();

router.get("/:id", async(req, res) => {
    const ubs = await req.context.models.Ubs.findById(req.params.id);
    if(!ubs) return res.status(404).send({message: "Ubs not found."});
    return res.send(ubs);
});

router.get("/", async(req, res) => {
    const allUbs = await req.context.models.Address.findAllUbs();
    return res.send(allUbs);
});

Ubs.createUbs = async function (data) {
    const { Address, Contact, Vaccin } = this.models;

    return await this.create(data, {
        include: [
            { model: Address },
            { model: Contact },
        ],
    });
};

router.put("/:ubsId", async (req, res) => {
    try{
        const updateUbs = await req.context.models.Ubs.updateUbs(
            req.params.ubsId,
            req.body
        );
        if(!updateUbs) return res.status(404).json({message: "Ubs not found."});
        return res.json(updateUbs);
    }catch(error){
        return res.status(400).json({error: error.message});
    }
});

router.delete("/:ubsId", async (req, res) => {
    try {
        const deleteUbs = await req.context.models.Ubs.deleteById(req.params.ubsId);
        if(!deleteUbs) return res.status(404).json({message: "Ubs not found."});
        return res.status(204).send();
    }catch(error){
        return res.status(500).json({error: error.message});
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