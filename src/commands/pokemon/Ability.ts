import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import { getPokeApi } from "../../utils/pokeAPI";

export default class Ability extends Command {
  public constructor() {
    super("ability", {
      aliases: ["ability"],
      cooldown: 10000,
      ratelimit: 1,
      category: "pokemon",
      description: "Returns info on an ability.",
      args: [
        {
          id: "name",
          type: "lowercase",
        },
      ],
    });
  }

  public async exec(msg: Message, { name }: { name: string }) {
    if (!name) return msg.channel.send("Please provide some args!");

    await getPokeApi(`/${name}`, "/ability")
      .then((ability) => {
        const { id, name, effect_entries, flavor_text_entries } = ability;

        const embed = new MessageEmbed()
          .setTitle(name)
          .addField("**ID**", id)
          .addField("**Description**", flavor_text_entries[2].flavor_text)
          .addField(
            "**Effect**",
            effect_entries[1].effect.includes("$effect_chance%")
              ? effect_entries[1].effect.replace(
                  /\$effect_chance/gi,
                  "effect_chance"
                )
              : effect_entries[1].effect
          )
          .setTimestamp(new Date())
          .setFooter("Leninardo");

        return msg.channel.send(embed);
      })
      .catch((err) => {
        return msg.channel.send(`Error omegalul ${err}`);
      });
  }
}
