// src/data/slashCommands.js
import { SlashCommandBuilder } from '@discordjs/builders';

const commands = [
    new SlashCommandBuilder()
        .setName('회원증')
        .setDescription('회원증 관련 명령어')
        .addSubcommand(subcommand =>
            subcommand
                .setName('조회')
                .setDescription('회원증 정보를 조회합니다.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('발급')
                .setDescription('도서관을 이용할 수 있는 회원증을 발급받습니다.')),
    new SlashCommandBuilder()
        .setName('사서')
        .setDescription('사서 관련 명령어')
        .addSubcommand(subcommand =>
            subcommand
                .setName('인사하기')
                .setDescription('Unwritten Bot이 사서에게 인사합니다.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('대화')
                .setDescription('사서와 대화를 시작합니다.'))
        .addSubcommandGroup(group =>
            group
                .setName('도움말')
                .setDescription('도서관에 대해 모르는 부분을 사서에게 물어봅니다.')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('사서')
                        .setDescription('사서에 대해 물어봅니다.'))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('도서관')
                        .setDescription('도서관에 대해 물어봅니다.'))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('아티팩트')
                        .setDescription('아티팩트에 대해 물어봅니다.'))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('도전과제')
                        .setDescription('도전과제에 대해 물어봅니다.'))
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('인벤토리')
                        .setDescription('인벤토리에 대해 물어봅니다.')))
    // 다른 명령어 추가 가능
];

export default commands.map(command => command.toJSON());