/// @Slash.Commands : unban.js

const { SlashCommandBuilder, PermissionFlagsBits, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { MessageFlags } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a user from the server.')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('Select a user from the ban list')
                .setAutocomplete(true)
                .setRequired(true)),
    async autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        try {
            const bans = await interaction.guild.bans.fetch();
            console.log(`[DEBUG] Total bans: ${bans.size}`);
    
            if (bans.size === 0) {
                return interaction.respond([]);
            }
    
            const choices = bans.map(ban => ({
                name: `${ban.user.tag} (${ban.user.id})`,
                value: ban.user.id,
            })).slice(0, 25);
    
            console.log(`[DEBUG] Autocomplete choices:`, choices);
    
            const filtered = choices.filter(choice => 
                choice.name.toLowerCase().includes(focusedValue.toLowerCase())
            );
    
            console.log(`[DEBUG] Filtered choices:`, filtered);
            
            await interaction.respond(filtered);
        } catch (error) {
            console.error('[ERROR] Failed to fetch ban list:', error);
            await interaction.respond([]);
        }
    },
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return interaction.reply({
                content: 'You do not have permission to use this command.',
                flags: MessageFlags.Ephemeral,
            });
        }

        const userId = interaction.options.getString('user');

        try {
            await interaction.guild.members.unban(userId);
            await interaction.reply({ content: `Successfully unbanned <@${userId}>.`, flags: MessageFlags.Ephemeral });
        } catch (error) {
            console.error(`[ERROR] Failed to unban user ${userId}:`, error);
            await interaction.reply({ content: 'An error occurred while trying to unban the user.', flags: MessageFlags.Ephemeral });
        }
    },
};
