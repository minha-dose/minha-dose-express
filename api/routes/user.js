import { Router } from "express";
const router = Router();

router.get('/email', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: 'Email é obrigatório' });
        }

        const user = await req.context.models.User.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/cpf', async (req, res) => {
    try {
        const { cpf } = req.query;
        if (!cpf) {
            return res.status(400).json({ error: 'Cpf é obrigatório' });
        }

        const user = await req.context.models.User.findUserByCpf(cpf);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const user = await req.context.models.User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found." });
    return res.send(user);
});


router.get("/", async (req, res) => {
    const user = await req.context.models.User.findAllUsers();
    return res.send(user);
});

router.post("/", async (req, res) => {
    try {
        const user = await req.context.models.User.createUser(req.body, req.context.models);
        return res.status(201).send(user);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await req.context.models.User.updateUser(
      req.params.id,
      req.body,
      req.context.models
    );
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