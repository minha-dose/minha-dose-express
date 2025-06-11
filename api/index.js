import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models/index.js';
import routes from './routes/index.js';

const port = process.env.PORT ?? 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('API está ONLINE'));

app.use((req, res, next) => {
  console.log(`Called method: ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  req.context = { models };
  next();
});

app.use("/api/v1/users", routes.user);
app.use("/api/v1/address", routes.address);
app.use("/api/v1/contact", routes.contact);
app.use("/api/v1/ubs", routes.ubs);
app.use("/api/v1/vaccin", routes.vaccin);
app.use("/api/v1/vaccincard", routes.vaccincard);

sequelize.sync()
  .then(() => {
    console.log('DB sincronizado. Servidor iniciando...');
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
  })
  .catch(err => console.error('Erro ao conectar DB:', err));