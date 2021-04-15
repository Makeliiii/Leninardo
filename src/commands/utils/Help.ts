import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class HelpCommand extends Command {
  public constructor() {
    super('help', {
      aliases: ['help'],
      category: 'util',
      description: 'Return all the commands or info on a specific command.',
      args: [
        {
          id: 'command',
          type: 'commandAlias',
        },
      ],
    });
  }

  async exec(
    msg: Message,
    { command }: { command: Command },
  ): Promise<Message> {
    if (!command) {
      const embed = new MessageEmbed().addField(
        '**❯ Commands**',
        `A list of available commands.
                Type \`${this.handler.prefix}help <command>\` for more info on a specific command.`,
      );

      for (const category of this.handler.categories.values()) {
        embed.addField(
          `**${category.id}**`,
          category
            .map((command) => {
              return `\`${command.aliases[0]}\``;
            })
            .join(' '),
        );
      }

      return msg.channel.send(embed);
    }

    const embed = new MessageEmbed()
      .setTitle(`\`${command.aliases[0]}\``)
      .addField('**❯ Description**', command.description || '\u200B');

    return msg.channel.send(embed);
  }
}
