/* eslint-disable */
import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import registerSlashCommands from './func/registerSlashCommands.js';

const REQUIRED_ROLES = ['도서관 회원', '도서관 정회원', '사서'];
const TOKEN = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const userAccounts = {};

// __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 명령어 불러오기
const commands = new Map();
const commandFiles = fs
    .readdirSync(path.join(__dirname, 'commands'))
    .filter((file) => file.endsWith('.js'));

commandFiles.forEach(async (file) => {
    const filePath = `file://${path.join(__dirname, 'commands', file)}`;
    try {
        const command = await import(filePath);
        if (command.default && command.default.name) {
            commands.set(command.default.name, command.default);
        } else {
            console.error(
                `Command ${file} does not have a valid export or name property.`
            );
        }
    } catch (error) {
        console.error(`Failed to load command ${file}:`, error);
    }
});

async function ensureRoles(guild) {
    const existingRoles = guild.roles.cache.map(role => role.name);

    for (const roleName of REQUIRED_ROLES) {
        if (!existingRoles.includes(roleName)) {
            try {
                await guild.roles.create({
                    name: roleName,
                    color: '#808080',
                    reason: '자동 생성된 역할',
                });
                console.log(`Created '${roleName}' role in guild ${guild.name}`);
            } catch (error) {
                console.error(`Failed to create '${roleName}' role in guild ${guild.name}:`, error);
            }
        }
    }
}

async function assignLibrarianRoleToSelf(guild) {
    const librarianRole = guild.roles.cache.find(role => role.name === '사서');
    if (librarianRole) {
        try {
            const botMember = await guild.members.fetch(client.user.id);
            const rolesToRemove = botMember.roles.cache.filter(role => REQUIRED_ROLES.includes(role.name) && role.name !== '사서');
            
            // Remove all roles except '사서'
            for (const role of rolesToRemove.values()) {
                await botMember.roles.remove(role);
                console.log(`Removed '${role.name}' role from bot in guild ${guild.name}`);
            }

            // Add '사서' role if not already present
            if (!botMember.roles.cache.has(librarianRole.id)) {
                await botMember.roles.add(librarianRole);
                console.log(`Assigned '사서' role to bot in guild ${guild.name}`);
            }
        } catch (error) {
            console.error(`Failed to manage roles for bot in guild ${guild.name}:`, error);
        }
    }
}

client.once('ready', async () => {
    console.log('Bot is online!');
    client.guilds.cache.forEach(async (guild) => {
        await ensureRoles(guild);
        await assignLibrarianRoleToSelf(guild);
        await registerSlashCommands(guild.id, TOKEN);
    });
});

client.on('guildCreate', async (guild) => {
    await ensureRoles(guild);
    await assignLibrarianRoleToSelf(guild);
    await registerSlashCommands(guild.id, TOKEN);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    const memberRoles = interaction.member.roles.cache.map(role => role.name);

    // Permission checks
    if (command.name === '회원증') {
        // Everyone can access '회원증 발급'
        // No additional checks needed
    } else if (command.name === '사서' && interaction.options.getSubcommand() === '인사하기') {
        // '도서관 회원' can access '회원증' and '사서 인사하기'
        if (!memberRoles.includes('도서관 회원') && !memberRoles.includes('도서관 정회원')) {
            await interaction.reply('이 명령어를 사용할 권한이 없습니다. 도서관 회원증이 필요합니다.');
            return;
        }
    } else {
        // '도서관 정회원' can access all commands
        if (!memberRoles.includes('도서관 정회원')) {
            if (!memberRoles.includes('도서관 회원')) {
                await interaction.reply('이 명령어를 사용할 권한이 없습니다. 도서관 회원증이 필요합니다.');
            } else {
                await interaction.reply('이 명령어를 사용할 권한이 없습니다. 먼저 사서와 대화를 나눠봅시다.');
            }
            return;
        }
    }

    try {
        await command.execute(interaction, userAccounts);
    } catch (error) {
        console.error(error);
        await interaction.reply('There was an error executing this command!');
    }
});

client.login(TOKEN);
