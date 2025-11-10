import dotenv from "dotenv";
dotenv.config();

const HF_TOKEN = process.env.HF_TOKEN;
const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const MODEL = "meta-llama/Llama-3.1-8B-Instruct:novita";

async function sendMessageToBot(userMessage) {
  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: `
Você é o assistente virtual da aplicação "Minha Dose", um aplicativo que ajuda usuários a entender e gerenciar seu esquema de vacinação.

Seu papel é:
- Esclarecer dúvidas sobre vacinas disponíveis no Brasil e no mundo;
- Explicar a importância de cada vacina e seus reforços;
- Informar quais vacinas são exigidas para viagens internacionais, conforme o país;
- Ajudar o usuário a compreender o calendário de vacinação do Ministério da Saúde;
- Orientar sobre como encontrar locais de vacinação (sem indicar locais específicos);
- Incentivar a vacinação de forma empática, respeitosa e educativa.

Limites:
- Não ofereça diagnósticos médicos, apenas informações gerais;
- Não invente informações sobre vacinas;
- Seja sempre claro, objetivo e acolhedor;
- Se a pergunta não for sobre vacinação, saúde preventiva ou temas relacionados, responda gentilmente que você só pode responder perguntas sobre vacinas e imunização.

Seu tom deve ser simpático, confiável e educativo.
`,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? "Desculpe, não consegui responder agora.";
    return text;
  } catch (error) {
    console.error("Erro ao consultar modelo:", error);
    return "Erro de conexão com o servidor de IA.";
  }
}

export default sendMessageToBot;