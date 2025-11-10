import { HF_TOKEN } from "@env"; // ou use diretamente se não tiver dotenv

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const MODEL = "meta-llama/Llama-3.1-8B-Instruct:novita";

export async function sendMessageToBot(userMessage) {
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
            content: "Você é um assistente amigável que ajuda usuários do app a tirar dúvidas.",
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