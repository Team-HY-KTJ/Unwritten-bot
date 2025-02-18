import { SlashCommandBuilder } from '@discordjs/builders';
import { checkUserExists, addUser } from '../utils/api.js';

export default {
    name: '회원증',
    description: '회원증 관련 명령어',
    execute: async (interaction) => {
        const subcommand = interaction.options.getSubcommand();
        const member = interaction.member;
        const guild = interaction.guild;

        if (subcommand === '발급') {
            try {
                const memberRole = guild.roles.cache.find(role => role.name === '도서관 회원');
                const seniorMemberRole = guild.roles.cache.find(role => role.name === '도서관 정회원');
                
                // "도서관 회원" 또는 "도서관 정회원" 역할이 없으면 "도서관 회원" 역할 부여
                if (!member.roles.cache.has(memberRole?.id) && !member.roles.cache.has(seniorMemberRole?.id)) {
                    if (memberRole) {
                        await member.roles.add(memberRole);
                        console.log(`Assigned '도서관 회원' role to ${member.user.tag}`);
                    }
                }

                const exists = await checkUserExists(member.id);
                if (exists) {
                    await interaction.reply('이미 회원증이 있습니다! 더 이상 발급할 필요가 없어요. 😊');
                    return;
                }

                await addUser(member.id, member.user.username);
                console.log('User added to backend.');

                await interaction.reply('회원증이 발급되었습니다!');
            } catch (error) {
                console.error('Error issuing membership:', error);
                await interaction.reply('회원증 발급 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
            }
        } else if (subcommand === '조회') {
            const hasMemberRole = member.roles.cache.some(role => role.name === '도서관 회원');
            if (hasMemberRole) {
                await interaction.reply('회원증이 있습니다. 조회 기능은 추후 추가 예정입니다.');
            } else {
                await interaction.reply('회원증이 없습니다. 발급받으세요.');
            }
        }
    },
    options: [
        {
            name: '발급',
            description: '도서관을 이용할 수 있는 회원증을 발급받습니다.',
            type: 'SUB_COMMAND',
        },
        {
            name: '조회',
            description: '회원증 정보를 조회합니다.',
            type: 'SUB_COMMAND',
        },
    ],
};
