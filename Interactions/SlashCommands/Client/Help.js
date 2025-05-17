const Command = require("../../../Structures/Classes/BaseCommand");
const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");
const { PaginationEmbed } = require("../../../Structures/Functions/index");
const { t } = require("i18next");


class Help extends Command {
  constructor(client, dir) {
    super(client, dir, {
      data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("command:help.description"),
    });
  }

  /**
   *
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("../../../Structures/Classes/BotClient").BotClient} client
   */
  async execute(interaction, client, lng) {
    let adminCmd = [];
    let clientCmd = [];
    let othersCmd = [];

    const cmdPush = (category, subCmd, command) => {
      try {
        switch (category.category) {
          case "Client":
            if (subCmd.length !== 0) infoCmd.push(...subCmd);
            else
              clientCmd.push({
                name: `</${command.name}:${command.id}>`,
                value: t(command.description, { lng }),
                inline: true,
              });
            break;
          case "Admin":
            if (subCmd.length !== 0) adminCmd.push(...subCmd);
            else
              adminCmd.push({
                name: `</${command.name}:${command.id}>`,
                value: t(command.description, { lng }),
                inline: true,
              });
            break;
          case "Other":
            if (subCmd.length !== 0) othersCmd.push(...subCmd);
            else
              othersCmd.push({
                name: `</${command.name}:${command.id}>`,
                value: t(command.description, { lng }),
                inline: true,
              });
            break;
          default:
            if (subCmd.length !== 0) othersCmd.push(...subCmd);
            else
              othersCmd.push({
                name: `</${command.name}:${command.id}>`,
                value: t(command.description, { lng }),
                inline: true,
              });
            break;
        }
      } catch (error) {
        console.log(error);
      }
    };

    await client.application.commands
      .fetch()
      .then((commands) => {
        commands.forEach((command) => {
          let subCmd = [];
          command.options.forEach((option) => {
            if (option.type == 1) {
              subCmd.push({
                name: `</${command.name + " " + option.name}:${command.id}>`,
                value: option.description,
                inline: true,
              });
            }
          });
          const ctg = client.slashCommands.get(command.name);
          cmdPush(ctg, subCmd, command);
        });
      })
      .catch((err) => {
        console.error("Error fetching commands:", err);
      });
    const embeds = [
      new EmbedBuilder()
        .setTitle(t("command:help.embeds.client.title", { lng }))
        .addFields(clientCmd)
        .setColor(Colors.DarkGreen),

      new EmbedBuilder()
        .setTitle(t("command:help.embeds.admin.title", { lng }))
        .addFields(adminCmd)
        .setColor(Colors.DarkGreen),

      new EmbedBuilder()
        .setTitle(t("command:help.embeds.other.title", { lng }))
        .addFields(
          othersCmd.length !== 0
            ? othersCmd
            : {
                name: "⠀",
                value: t("command:help.embeds.other.notAvailable", { lng }),
              }
        )
        .setColor(Colors.DarkGreen),
    ];

    await PaginationEmbed(interaction, embeds);
  }
}

module.exports = Help;
