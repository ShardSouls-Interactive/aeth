const Command = require("../../../Structures/Classes/BaseCommand");
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

class SendMessage extends Command {
  constructor(client, dir) {
    super(client, dir, {
      data: new SlashCommandBuilder()
        .setName("send")
        .setDescription("Envia uma mensagem")
        .setDMPermission(true),
      options: {
        premiumGuild: true,
        premiumUser: false,
        devOnly: true,
      },
    });
  }

  /**
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("../../../Structures/Classes/BotClient").BotClient} client
   * @param {string} lng
   */
  async execute(interaction, client, lng) {
    const embed = new EmbedBuilder()
      .setTitle("💌 Com todo o meu coração... Me desculpem!")
      .addFields(
        {
          name: "😶‍🌫️ O-oi...",
          value: `Sou eu, **${client.user.username}**... Eu queria pedir desculpas com todo o meu coração!`,
          inline: false,
        },
        {
          name: "😵‍💫 O que houve?",
          value: `Acontece que... meu criador, <@973133599568171039>, cometeu um errinho ao me configurar, e eu acabei sendo um pouco dura demais com alguns de vocês... *gomenasai!*`,
          inline: false,
        },
        {
          name: "Promessa de coração! ❤️",
          value: "Nós ajustamos tudo direitinho agora. Prometo ser mais gentil e justa daqui pra frente!\n\nSe eu te bani ou te dei strike injustamente... por favor, me perdoa? 🙏🥹",
          inline: false,
        }
      )
      .setFooter({ text: `Com carinho, ${client.user.username} 💕` })
      .setColor("#f48fb1")
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("perdoar_mila")
        .setLabel("😮‍💨 Tudo bem, Mila!")
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("ainda_chateado")
        .setLabel("🙂‍↔️ Ainda estou chateado(a)...")
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.channel.send({ embeds: [embed], components: [row] });
  }
}

module.exports = SendMessage;