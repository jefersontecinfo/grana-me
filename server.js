import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// 🔑 Substitua pelos dados da sua instância Z-API:
const INSTANCE_ID = "3E9446420CFE31AF9676CAE6335FD653";
const TOKEN = "6E096E4375A53DD1553156DA";
const ZAPI_URL = `https://api.z-api.io/instances/${INSTANCE_ID}/token/${TOKEN}/v2/messages/send-text`;

// 📨 Quando a Z-API enviar uma mensagem recebida:
app.post("/webhook", async (req, res) => {
  try {
    const { message, phone } = req.body.data;

    console.log(`📩 Mensagem recebida de ${phone}: ${message}`);

    // Cria uma resposta simples
    const resposta = `✅ Recebi sua mensagem: "${message}"`;

    // Envia a resposta de volta pro WhatsApp via Z-API
    await axios.post(ZAPI_URL, {
      phone,
      message: resposta
    });

    res.sendStatus(200);
  } catch (err) {
    console.error("⚠️ Erro ao responder:", err.response?.data || err.message);
    res.sendStatus(500);
  }
});

// 🚀 Inicia o servidor local
app.listen(3000, () => {
  console.log("🤖 Servidor do assistente financeiro rodando na porta 3000");
});

