const Command = require("../../../Structures/Classes/BaseCommand");
const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

class Clear extends Command {
  constructor(client, dir) {
    super(client, dir, {
      data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Limpa uma quantidade de mensagens do canal.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
          option
            .setName("quantidade")
            .setDescription("Número de mensagens para apagar (1-1000).")
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(1000)
        ),
    });
  }

  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("../../../Structures/Classes/BotClient").BotClient} client
   */
  async execute(interaction, client) {
    const amount = interaction.options.getInteger("quantidade");

    // Defer reply usando flags para torná-lo ephemeral
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const channel = interaction.channel;

    if (!channel || !channel.isTextBased()) {
      return interaction.editReply({
        content: "Não foi possível identificar um canal de texto válido.",
        flags: MessageFlags.Ephemeral,
      });
    }

    try {
      const messages = await channel.bulkDelete(amount, true);
      await interaction.editReply({
        content: `🧹 Apaguei ${messages.size} mensagem(ns) com sucesso.`,
        flags: MessageFlags.Ephemeral,
      });
    } catch (err) {
      console.error(err);
      await interaction.editReply({
        content: "❌ Ocorreu um erro ao tentar apagar as mensagens. Verifique se as mensagens têm menos de 14 dias.",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}

module.exports = Clear;