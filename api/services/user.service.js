import userRepository from "../repositories/user.repository.js";

async function createUserService(data, models) {
    const user = await userRepository.createUserRepository(data, models);
}