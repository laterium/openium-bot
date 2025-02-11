/// @Slash.Commands : ban.js

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { MessageFlags } = require('discord-api-types/v10'); 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a user from the server for a specific duration or permanently.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for banning the user')
                .setRequired(false))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Ban duration in minutes (leave empty for permanent ban)')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return interaction.editReply({ content: 'You do not have permission to use this command.' });
        }

        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const duration = interaction.options.getInteger('duration');

        if (!user) {
            console.log(`[ERROR] User not found in command /ban`);
            return interaction.editReply({ content: 'User not found.' });
        }

        try {
            const member = await interaction.guild.members.fetch(user.id);
            if (!member) {
                console.log(`[LOG] Attempted to ban ${user.tag}, but they are not in the server.`);
                return interaction.editReply({ content: 'That user is not a member of this server.' });
            }

            await member.ban({ reason });
            console.log(`[LOG] ${user.tag} has been banned. Reason: ${reason}`);
            await interaction.editReply(`${user.tag} has been banned. Reason: ${reason}`);

            if (duration && duration > 0) {
                setTimeout(async () => {
                    try {
                        await interaction.guild.members.unban(user.id);
                        console.log(`[LOG] ${user.tag} has been unbanned after ${duration} minutes.`);
                    } catch (error) {
                        console.error(`[ERROR] Failed to unban ${user.tag}:`, error);
                    }
                }, duration * 60 * 1000);
            }

        } catch (error) {
            console.error(`[ERROR] Failed to ban ${user.tag}:`, error);
            await interaction.editReply({
                content: 'I was unable to ban the user. They may have a higher role than me or other restrictions apply.'
            });
        }
    },
};
