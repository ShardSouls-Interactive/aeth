const Event = require("../../Structures/Classes/BaseEvent");
const { CommandHandler } = require("../../Structures/Handlers/CommandHandler");
const {
  ComponentHandler,
} = require("../../Structures/Handlers/ComponentHandler");
const { loadLanguages } = require("../../Structures/Handlers/LanguageHandler");
const { ConnectMongo } = require("../../Schemas/index");
const { Events, ActivityType, PresenceUpdateStatus } = require("discord.js");

class Ready extends Event {
  constructor(client) {
    super(client, {
      name: Events.ClientReady,
    });
  }

  /**
   *
   * @param {import("../../Structures/Classes/BotClient").BotClient} client
   */
  async execute(client) {
    setInterval(() => {
      const activitys = [
        {
          name: `Bloom! Store na Shopee`,
          type: ActivityType.Streaming,
        },
        {
          name: `https://www.bloomverse.site`,
          type: ActivityType.Streaming,
        },
        {
          name: `EtherSyn`,
          type: ActivityType.Playing,
        },
        {
          name: `Mika Yumi 🐈‍⬛ 🦊 Bloom!`,
          type: ActivityType.Watching,
        },
        {
          name: `/help`,
          type: ActivityType.Watching,
        },
        {
          name: `A.P.T`,
          type: ActivityType.Listening,
        },
      ];
      const activity = activitys[Math.floor(Math.random() * activitys.length)];
      client.user.setActivity(activity);
      client.user.setStatus(PresenceUpdateStatus.Online);
    }, 8000);

    const { loadCommands } = new CommandHandler();
    const { loadComponents } = new ComponentHandler();

    try {
      await loadLanguages();
      await loadCommands(client, client.config.deploySlashOnReady);
      await loadComponents(client);
    } catch (error) {
      client.logger.error(error);
    }

    client.logger.success(
      `${client.user.username}(#${client.cluster.id}) is ready!`
    );

    try {
      await ConnectMongo(client);
    } catch (error) {
      client.logger.error(error);
    }
  }
}

module.exports = Ready;
