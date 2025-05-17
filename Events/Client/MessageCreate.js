const { Events } = require("discord.js");
const path = require("path");
const badwords = require("../../Interactions/Utils/BadWords");
const { userDatas } = require("../../Schemas/index.js");
const { t } = require("i18next");

const palavrasBanidas = badwords(path.join(__dirname, "../../BadWordsData.xml"));

module.exports = class {
  constructor(client) {
    this.name = Events.MessageCreate;
    this.client = client;
  }

  async execute(message, client, lng) {
    if (
      !message.guild ||
      message.author.bot ||
      !message.member ||
      !message.content ||
      message.type !== 0
    ) return;

    const conteudo = message.content.toLowerCase();
    const encontrado = palavrasBanidas.some(p => {
  const pattern = `(^|\\s|[^\\p{L}\\p{N}])${p}(?=$|\\s|[^\\p{L}\\p{N}])`;
  const regex = new RegExp(pattern, "iu");
  const result = regex.test(conteudo);
  if (result) {
    console.log(`[MATCH] Palavra detectada: "${p}" na mensagem: "${conteudo}"`);
    client.logger.warning(`[Badwords/MATCH] Palavra detectada: "${p}" na mensagem: "${conteudo}"`);
    return true;
  }
  return false;
});

    if (!encontrado) return;

    await message.delete();

    const filtro = { userId: message.author.id, guildId: message.guild.id };
    let user = await userDatas.findOne(filtro);
    if (!user) user = await userDatas.create({ ...filtro, strikes: 1, lastWarn: new Date() });
    else {
      user.strikes++;
      user.lastWarn = new Date();
      await user.save();
    }

    if (user.strikes === 1) {
      return message.channel.send(`⚠️ ${message.author}, ${t("message:strike.t1", { lng })}`);
    }

    if (user.strikes === 2) {
      const muteRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === "mutated");
      if (muteRole) {
        await message.member.roles.add(muteRole).catch(() => {});
        setTimeout(() => message.member.roles.remove(muteRole).catch(() => {}), 5 * 60 * 1000);
      }
      return message.channel.send(`⚠️ ${message.author}, ${t("message:strike.t2", { lng })}`);
    }

    if (user.strikes === 3) {
      const muteRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === "mutated");
      if (muteRole) {
        await message.member.roles.add(muteRole).catch(() => {});
        setTimeout(() => message.member.roles.remove(muteRole).catch(() => {}), 15 * 60 * 1000);
      }
      return message.channel.send(`⚠️ ${message.author}, ${t("message:strike.t3", { lng })}`);
    }

    if (user.strikes >= 4) {
      await message.member.ban({ reason: t("message:strike.reason", { lng }) });
      await userDatas.deleteOne(filtro);
      return message.channel.send(`**${message.author.tag}** ${t("message:strike.ban", { lng })}`);
    }
  }
};