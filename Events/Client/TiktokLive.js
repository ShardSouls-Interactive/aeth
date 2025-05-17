const axios = require("axios");
const { Events } = require("discord.js");

const TIKTOK_USERNAME = "mika_yumi15";
const RAPIDAPI_KEY = "25408432ecmsh50898c93cc7fa40p1f2125jsnc85b437485e4";
const DISCORD_CHANNEL_ID = "1370494310486905034";

let jaAvisou = false;

module.exports = class {
  constructor(client) {
    this.name = Events.ClientReady;
    this.client = client;
  }

  async execute(client) {
    console.log("Monitoramento de TikTok Live iniciado...");

    setInterval(async () => {
      try {
        const response = await axios.get(
          `https://tiktok-api23.p.rapidapi.com/api/live/check-alive?uniqueId=${TIKTOK_USERNAME}`,
          {
            headers: {
              "X-RapidAPI-Key": RAPIDAPI_KEY,
              "X-RapidAPI-Host": "tiktok-api23.p.rapidapi.com"
            }
          }
        );

        const estaAoVivo = response.data?.data?.[0]?.alive;

        if (estaAoVivo && !jaAvisou) {
          const canal = client.channels.cache.get(DISCORD_CHANNEL_ID);
          if (canal) {
            console.log("Canal encontrado, enviando alerta de live...");
            canal.send(`**Estou ao vivo no TikTok agora!**\n[Assista no Tiktok](https://www.tiktok.com/@${TIKTOK_USERNAME}/live)`);
            jaAvisou = true;
          } else {
            console.log("Canal do Discord não encontrado!");
          }
        } else if (!estaAoVivo) {
          jaAvisou = false;
        }
      } catch (err) {
        console.error("Erro ao verificar live TikTok:", err.response?.data || err.message);
      }
    }, 9000 * 1000); // Verifica a cada meio minuto
  }
};