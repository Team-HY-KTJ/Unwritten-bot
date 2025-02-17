/* eslint-disable */
import commandListEmbed from '../utils/embeds.js';

export default {
    name: 'hello',
    description: 'O3O Bot greets you and tells you the commands you can use!',
    execute: async (interaction) => {
        const userMention = `<@${interaction.user.id}>`;
        await interaction.reply(
            `안녕하세요 ${userMention}! 저는 Unwritten 봇입니다!`
        );
    },
};
