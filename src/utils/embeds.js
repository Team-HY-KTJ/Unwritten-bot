import { EmbedBuilder } from 'discord.js';

const commandListEmbed = new EmbedBuilder()
    .setColor('#5762EB')
    .setTitle('How can I help you?')
    .addFields(
        { name: '/help', value: 'Show all commands of Unwritten bot!', inline: true },
        {
            name: '/hello',
            value: 'Unwritten Bot greets you and tells you the commands you can use!',
            inline: true,
        }
    );

export default commandListEmbed;
