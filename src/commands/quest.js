import { EmbedBuilder, hideLinkEmbed } from 'discord.js';

export default {
    name: '퀘스트',
    description: '진행할 수 있는 퀘스트 목록 표시',
    
    execute: async (interaction) => {
        const member = interaction.member;
        const guild = interaction.guild;
        
        //임시 퀘스트 목록
        const dailyQuestList = [
            "1. 아아아ㅏ아ㅏㅏ아ㅏ아아",
            "2. 이야호!",
            "3. 제하하하하",
        ];

        const dailyQuestDetail = [
            ">>> 소리치십시오! 아아아아아!\n**:moneybag:보상**: 축하의 박수!\n:notepad_spiral:**진행상황**: 0/1",
            ">>> 마리오가 되어봅시다. 점프! 이야호~~\n**:moneybag:보상**: 점프력\n:notepad_spiral:**진행상황**: 0/1",
            ">>> 크하하하하핳하하하하하!!,\n**:moneybag:보상**: 자신감\n:notepad_spiral:**진행상황**: 0/1"
        ]

        const hiddenQuestList = [
            "1. 인사성 바른 어린이는 어딜가도 사랑받죠!",
            "2. ???",
        ];

        const hiddenQuestDetail = [
            ">>> 인사해봅시다!\n**:moneybag:보상**: 사서의 사랑!\n:notepad_spiral:**진행상황**: 0/1",
            ">>> ???\n**:moneybag:보상**: 엄청난 비밀이 담긴 무언가\n:notepad_spiral:**진행상황**: 0/12",
        ]

        const hiddenQuestEmoji = "<:goldenQuestionMark:1341326333677932565>";

        // const questEmbed = new EmbedBuilder().setColor('Blue').setTitle('퀘스트 목록')
        // .addFields(
        //     {name: `🌿일일 퀘스트`, value: dailyQuestList.join('\n')})

        const questEmbed = new EmbedBuilder().setColor('Blue').setTitle('퀘스트 목록')
        .addFields(
            {name: "🌿일일 퀘스트", value: '\u200B'}
        )
        for (let i = 0; i < dailyQuestList.length; i++) {
            questEmbed.addFields(
                {name: dailyQuestList[i], value: dailyQuestDetail[i]},
            )
        }
        
        if (hiddenQuestList.length > 0) {
            questEmbed.addFields(
                {name: '\u200B', value: '\u200B'},
                {name: `${hiddenQuestEmoji}히든 퀘스트`, value: '\u200B'}
            )
            for (let i = 0; i<hiddenQuestList.length; i++) {
                questEmbed.addFields(
                    {name: hiddenQuestList[i], value: hiddenQuestDetail[i]},
                )
            }
        }

        await interaction.reply({embeds: [questEmbed]});
    }
}