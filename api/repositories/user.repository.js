import models from './models/index.js';


const createUserRepository = (data, models) => {
    models.User.createUser(data, models);
}

export default { createUserRepository }