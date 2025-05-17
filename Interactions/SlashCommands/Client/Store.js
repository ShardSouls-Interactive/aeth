const Command = require("../../../Structures/Classes/BaseCommand");
const { SlashCommandBuilder, EmbedBuilder, Colors } = require("discord.js");
const { PaginationEmbed } = require("../../../Structures/Functions/index");
const { ref, get, child } = require("firebase/database");
const db = require("../../../Structures/Functions/Firebase");
const { MessageFlags } = require("discord-api-types/v10");

class Store extends Command {
  constructor(client, dir) {
    super(client, dir, {
      data: new SlashCommandBuilder()
        .setName("store")
        .setDescription("Mostra os produtos disponíveis."),
    });
  }

  async execute(interaction, client, lng) {
    const guildId = interaction.guild.id;
    const storeRef = ref(db, `stores/${guildId}`);

    const snapshot = await get(storeRef);
    if (!snapshot.exists()) {
      return interaction.reply({
        content: "Nenhum item cadastrado.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const items = Object.values(snapshot.val());

    const embeds = items.map((item, index) => {
      return new EmbedBuilder()
        .setThumbnail("https://www.bloomverse.site/assets/images/art.png")
        .setTitle(item.item)
        .setURL(item.link)
        .setDescription(item.description || "Sem descrição")
        .setColor(Colors.Purple)
        .addFields(
          { name: "Preço", value: item.price, inline: true },
          { name: "Estoque", value: item.stock ? "Disponível" : "Indisponível", inline: true }
        )
        .setImage(item.image);
    });

    await PaginationEmbed(interaction, embeds);
  }
}

module.exports = Store;
/*
    const items = [
      {
        name: "Chaveiro - Mika Yumi",
        description: "",
        price: "R$ 16,00",
        link: "https://shopee.com.br/Chaveiro-Vtuber-Bloom!-Plastificado-i.996658691.22493946242",
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m93lowzncttudd@resize_w750_nl.webp"
      },
      {
        name: "Bloquinho de Notas - Yumy",
        description: "",
        price: "R$ 16,00",
        link: "https://shopee.com.br/Bloco-de-notas-i.996658691.22593965698",
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m9eq2q02exvma2@resize_w750_nl.webp"
      },
      {
        name: "Adesivos - Furabolo",
        description: "",
        price: "R$ 3,00",
        link: "https://shopee.com.br/Adesivos-i.996658691.23198440919",
        image: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m96eoy8z9hqac2@resize_w750_nl.webp"
      }
    ]; */
    