# 💉 Minha Dose Express API

API RESTful desenvolvida com **Node.js**, **Express**, **Sequelize** e **PostgreSQL**, voltada para o gerenciamento de usuários, contatos, endereços, unidades básicas de saúde (UBS), vacinas, cartões de vacinação e agendamentos.

## 🌐 Link da API

Acesse a API em produção:

👉 [https://minha-dose-express.onrender.com](https://minha-dose-express.onrender.com)

---

## 🚀 Endpoints principais

| Recurso         | Endpoint base                     |
|-----------------|-----------------------------------|
| Usuários        | `/api/v1/users`                   |
| Endereços       | `/api/v1/address`                 |
| Contatos        | `/api/v1/contact`                 |
| UBS             | `/api/v1/ubs`                     |
| Vacinas         | `/api/v1/vaccin`                  |
| Cartão Vacina   | `/api/v1/vaccincard`              |
| Agendamentos    | `/api/v1/appointment`             |

---

## ⚙️ Tecnologias utilizadas

- Node.js
- Express
- Sequelize
- PostgreSQL
- Babel
- Docker
- Render (deploy)

---

## 🧪 Teste local com Docker

```bash
docker build -t minha-dose-api .
docker run -p 3000:3000 -e DB_URL="sua_string_de_conexao" minha-dose-api
