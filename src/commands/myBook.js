import { EmbedBuilder, hideLinkEmbed } from 'discord.js';

export default {
    name: '모험의서',
    description: '내 도전과제 현황 확인',
    
    execute: async (interaction) => {
        const member = interaction.member;
        const guild = interaction.guild;

        let num = 0;

        const bookPages = [
            new EmbedBuilder().setTitle("📗모험의 서").setColor('Green')
            .setDescription("페이지를 채우라는 사서의 제안과 함께 받은 나만의 이야기")
            .addFields(
                {name:'\u200B', value:'도전과제 1', inline:true},
                {name:'\u200B', value:'도전과제 2', inline:true},
                {name:'\u200B', value:'\u200B',inline:false}, 
                {name:'\u200B', value:'도전과제 3', inline:true}, 
                {name:'\u200B', value:'도전과제 4', inline:true}
            )
            .setFooter(`Page 1/${num}`),
            new EmbedBuilder().setTitle("📗모험의 서").setColor('Green')
            .setDescription("페이지를 채우라는 사서의 제안과 함께 받은 나만의 이야기")
            .addFields(
                {name:'\u200B', value:'도전과제 5', inline:true},
                {name:'\u200B', value:'도전과제 6', inline:true},
                {name:'\u200B', value:'\u200B',inline:false}, 
                {name:'\u200B', value:'도전과제 7', inline:true}, 
                {name:'\u200B', value:'도전과제 8', inline:true}
            )
            .setFooter(`Page 2/${num}`),
            new EmbedBuilder().setTitle("📗모험의 서").setColor('Green')
            .setDescription("페이지를 채우라는 사서의 제안과 함께 받은 나만의 이야기")
            .addFields(
                {name:'\u200B', value:'도전과제 9', inline:true},
                {name:'\u200B', value:'도전과제 10', inline:true},
                {name:'\u200B', value:'\u200B',inline:false}, 
                {name:'\u200B', value:'도전과제 11', inline:true}, 
                {name:'\u200B', value:'도전과제 12', inline:true}
            )
            .setFooter(`Page 3/${num}`),
        ]
        
        num = bookPages.length();
        let currentPage = 0;

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('back').setLabel('⬅️ 이전').setStyle(1).setDisabled(true),
            new ButtonBuilder().setCustomId('next').setLabel('➡️ 다음').setStyle(1)
        );

        const message = await interaction.reply({ embeds: [bookPages[currentPage]], components: [row], fetchReply: true });
        
        const collector = message.createMessageComponentCollector({ time: 60000 });

        collector.on('collect', async (buttonInteraction) => {
            if (buttonInteraction.customId === 'next') currentPage++;
            if (buttonInteraction.customId === 'prev') currentPage--;

            row.components[0].setDisabled(currentPage === 0);
            row.components[1].setDisabled(currentPage === pages.length - 1);

            await buttonInteraction.update({ embeds: [pages[currentPage]], components: [row] });
        })

        collector.on('end', () => {
            row.components.forEach(button => button.setDisabled(true));
            message.edit({ components: [row] });
        });

    }
}