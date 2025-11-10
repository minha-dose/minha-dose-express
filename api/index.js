import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models/index.js';
import routes from './routes/index.js';
import sendMessageToBot from "./services/chatService.js"

const port = process.env.PORT || 3000;
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
app.use("/api/v1/appointment", routes.appointment);
app.use("/api/v1/auth", routes.auth);
app.use("/api/v1/passwordReset", routes.passwordReset);

app.post("/api/v1/chat", async (req, res) => {
  try {
    const { message, messages } = req.body;
    const userMessage = message || messages?.[messages.length - 1]?.content;

    if (!userMessage) {
      return res.status(400).json({ error: "Mensagem não fornecida" });
    }

    const botReply = await sendMessageToBot(userMessage);
    res.json({ reply: botReply });
  } catch (error) {
    console.error("Erro no endpoint /chat:", error);
    res.status(500).json({ error: "Erro interno no servidor de IA" });
  }
});

//sequelize.sync({alter:true})
sequelize.sync()
  .then(() => {
    console.log('DB sincronizado. Servidor iniciando...');
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
  })
  .catch(err => console.error('Erro ao conectar DB:', err));

  module.exports = app;