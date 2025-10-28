async function createUserController(req, res) {

    try {
        const user = await userService.createUserService(req.body, req.context.models)
        return res.status(201).send(user);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}