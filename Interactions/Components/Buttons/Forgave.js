const Component = require("../../../Structures/Classes/BaseComponent");
const { forgaveDatas } = require("../../../Schemas/index.js");
const { MessageFlags } = require("discord.js");

class Perdoar extends Component {
  constructor(client) {
    super(client, {
      id: "perdoar_mila",
    });
  }

  /**
   * @param {import("discord.js").ButtonInteraction} interaction
   */
  async execute(interaction) {
    try {
      await forgaveDatas.findOneAndUpdate(
        {
          userId: interaction.user.id,
          guildId: interaction.guild?.id || "DM",
        },
        {
          userId: interaction.user.id,
          userName: interaction.user.username,
          guildId: interaction.guild?.id || "DM",
          guildName: interaction.guild?.name || "DM",
          language: "pt-br",
          forgave: true,
        },
        { upsert: true, new: true }
      );

      return await interaction.reply({
        content: "Fico muito feliz com seu perdão! Vou ser mais gentil daqui pra frente.",
        flags: MessageFlags.Ephemeral,
      });

    } catch (err) {
      console.error("Erro ao salvar resposta de perdão:", err);
      return await interaction.reply({
        content: "Desculpa! Algo deu errado ao salvar sua resposta.",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}

module.exports = Perdoar;