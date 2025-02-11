/// @Slash.Commands : untimeout.js

const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
const { MessageFlags } = require('discord-api-types/v10');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('untimeout')
        .setDescription('Removes a timeout (mute) from a user.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to remove the timeout from')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for removing the timeout')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({
                content: 'You do not have permission to use this command.',
                flags: MessageFlags.Ephemeral,
            });
        }

        const user = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!user) {
            return interaction.reply('Please mention a valid user to remove the timeout from.');
        }

        const member = await interaction.guild.members.fetch(user.id);

        if (!member.isCommunicationDisabled()) {
            return interaction.reply(`${user.tag} is not currently timed out.`);
        }

        try {
            await member.timeout(null, reason);

            await interaction.reply(`Timeout has been removed from ${user.tag}. Reason: ${reason}`);

            const untimeoutEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Timeout Removed')
                .setDescription(`Timeout has been removed from ${user.tag}.\nReason: ${reason}`)
                .setTimestamp();

            await interaction.followUp({ embeds: [untimeoutEmbed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('I was unable to remove the timeout from the user.');
        }
    },
};
