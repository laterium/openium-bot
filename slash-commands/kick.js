/// @Slash.Commands : kick.js

const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { MessageFlags } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a user from the server.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for kicking the user')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return interaction.reply({
                content: 'You do not have permission to use this command.',
                flags: MessageFlags.Ephemeral,
            });
        }

        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!user) {
            console.log(`[ERROR] User not found in command /kick`);
            return interaction.reply({
                content: 'User not found.',
                flags: MessageFlags.Ephemeral
            });
        }

        try {
            const member = await interaction.guild.members.fetch(user.id);
            if (!member) {
                console.log(`[LOG] Attempted to kick ${user.tag}, but they are not in the server.`);
                return interaction.reply({
                    content: 'That user is not a member of this server.',
                    flags: MessageFlags.Ephemeral
                });
            }

            await member.kick(reason);
            console.log(`[LOG] ${user.tag} has been kicked. Reason: ${reason}`);
            await interaction.reply(`${user.tag} has been kicked. Reason: ${reason}`);
        } catch (error) {
            console.error(`[ERROR] Failed to kick ${user.tag}:`, error);
            await interaction.reply({
                content: 'I was unable to kick the user. They may have a higher role than me or other restrictions apply.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
