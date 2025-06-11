import 'dotenv/config';
import cors from "cors";
import express from "express"
import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js"
const app = express();
const port = process.env.port ?? 3000;
const eraseDatabaseOnSync = process.env.ERASE_DB === "true" ?? false;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Para debug ao chamar o endpoint:
app.use((req, res, next) => {
  console.log(`Called method: ${req.method} ${req.url} - Body: `, req.body);
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

//Conexão com o banco de dados:
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`); });
})
  .catch((err) => {
    console.error("Erro ao conectar com o banco de dados:", err);
  });

//Base para teste de servidor on:
// app.get('/', (req, res) => {
//   res.send("API ON!");
// });

// app.listen(port, () => {
//   console.log("Listening on port " + port);
// });