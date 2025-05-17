const Component = require("../../../Structures/Classes/BaseComponent");
const { EmbedBuilder, Colors } = require("discord.js");
const { t } = require("i18next");
const { ref, push, set } = require("firebase/database");
const db = require("../../../Structures/Functions/Firebase");

class StoreAddModal extends Component {
  constructor(client) {
    super(client, {
      id: "add-product-modal",
    });
  }

  async execute(interaction, client, lng) {
    const item = interaction.fields.getTextInputValue("item");
    const price = interaction.fields.getTextInputValue("price");
    const link = interaction.fields.getTextInputValue("link");
    const image = interaction.fields.getTextInputValue("image");
    const description = interaction.fields.getTextInputValue("description");
    const guildId = interaction.guild.id;

    try {
      const storeRef = ref(db, `stores/${guildId}`);
      const newProductRef = push(storeRef);

      await set(newProductRef, {
        item,
        price,
        link,
        image,
        description,
        stock: true,
      });

      const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTitle(t("component:modal.addProduct.successTitle", { lng }))
        .setDescription(
          t("component:modal.addProduct.successDescription", {
            lng,
            item,
          })
        );

      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    } catch (err) {
      console.error("Erro ao salvar produto:", err);

      return await interaction.reply({
        content: t("component:modal.addProduct.error", { lng }),
        ephemeral: true,
      });
    }
  }
}

module.exports = StoreAddModal;