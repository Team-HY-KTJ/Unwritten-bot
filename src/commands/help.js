/* eslint-disable */
import commandListEmbed from '../utils/embeds.js';

export default {
    name: 'help',
    description: 'Show all commands of Unwritten bot!',
    execute: async (interaction) => {
        await interaction.reply({ embeds: [commandListEmbed] });
    },
};
