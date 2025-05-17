const Command = require("../../../Structures/Classes/BaseCommand");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");
const { t } = require("i18next");

class StoreAdd extends Command {
  constructor(client, dir) {
    super(client, dir, {
      data: new SlashCommandBuilder()
        .setName("store-add")
        .setDescription("Adiciona um novo produto à loja.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),
    });
  }

  /**
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   * @param {import("../../../Structures/Classes/BotClient").BotClient} client
   * @param {string} lng
   */
  async execute(interaction, client, lng) {
    const modal = new ModalBuilder()
      .setCustomId("add-product-modal")
      .setTitle("Adicionar Produto");

    const itemInput = new TextInputBuilder()
      .setCustomId("item")
      .setLabel("Nome do produto")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder(t("command:modal.store.item.placeholder", { lng }))
      .setRequired(true);

    const priceInput = new TextInputBuilder()
      .setCustomId("price")
      .setLabel("Preço")
      .setStyle(TextInputStyle.Short)
      .setMaxLength(12)
      .setPlaceholder(t("command:modal.store.price.placeholder", { lng }))
      .setRequired(true);

    const linkInput = new TextInputBuilder()
      .setCustomId("link")
      .setLabel("Link do produto")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder(t("command:modal.store.link.placeholder", { lng }))
      .setRequired(true);

    const imageInput = new TextInputBuilder()
      .setCustomId("image")
      .setLabel("Imagem (URL)")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Descrição")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder(t("command:modal.store.description.placeholder", { lng }))
      .setRequired(false);

    modal.addComponents(
      new ActionRowBuilder().addComponents(itemInput),
      new ActionRowBuilder().addComponents(priceInput),
      new ActionRowBuilder().addComponents(linkInput),
      new ActionRowBuilder().addComponents(imageInput),
      new ActionRowBuilder().addComponents(descriptionInput)
    );

    await interaction.showModal(modal);
  }
}

module.exports = StoreAdd;