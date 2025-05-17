const Command = require("../../../Structures/Classes/BaseCommand");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { t } = require("i18next");

class Language extends Command {
  constructor(client, dir) {
    super(client, dir, {
      data: new SlashCommandBuilder()
        .setName("language")
        .setDescription("Set a language for this server.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
          option
            .setName("language")
            .setDescription("Select a language.")
            .setRequired(true)
            .addChoices([
              { name: "『🇧🇷』Português", value: "pt_br" },
              { name: "『🇬🇷』Ελληνικά", value: "el" },
              { name: "『🇬🇧』English", value: "en" },
              { name: "『🇯🇵』日本語", value: "ja" },
              { name: "『🇰🇷』한국어", value: "ko" },
              { name: "『🇨🇳』简体中文", value: "zh" },
              { name: "『🇪🇸』Español", value: "es" },
            ])
        ),
    });
  }
  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("../../../Structures/Classes/BotClient").BotClient} client
   */
  async execute(interaction, client) {
    const lng = interaction.options.getString("language");
    await client.db.languageDatas.findOneAndUpdate(
      {
        guildId: interaction.guildId,
      },
      { lng: lng }
    );
        
    interaction.reply({
      content: t("command:language.success", {
        lng: lng,
        data:
          lng == "en"
            ? "『🇬🇧』English"
            : lng == "el"
            ? "『🇬🇷』Ελληνικά"
            : lng == "ko"
            ? "『🇰🇷』한국어"
            : lng == "zh"
            ? "『🇨🇳』简体中文"
            : lng == "es"
            ? "『🇪🇸』Español"
            : lng == "ja"
            ? "『🇯🇵』日本語"
            : "『🇧🇷』Português",
        user: interaction.user.id,
      }),
    });
  }
}

module.exports = Language;
