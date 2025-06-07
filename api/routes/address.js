import { Router } from "express";
const router = Router();

router.get("/:id", async(req, res) => {
    const address = await req.context.models.Address.findById(req.params.id);
    if(!address) return res.status(404).send({message: "Address not found."});
    return res.send(address);
});

router.get("/", async(req, res) => {
    const addresses = await req.context.models.Address.findAllAddresses();
    return res.send(addresses);
});

router.get("/users/:userId", async (req, res) => {
    const {userId} = req.params;
    try{
        const address = await req.context.models.Address.findAddressByUserId(userId);
        if(!address){
            return res.status(404).send({message: "Address not found."});
        }
        return res.send(address);
    }catch(error){
        return res.status(500).send({error: error.message});
    }
})