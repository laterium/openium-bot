/// @Slash.Commands : avatar.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Displays the avatar of a user!')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Select a user to see their avatar')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;

        const avatarEmbed = {
            color: 0xfff070,
            title: `${user.username}'s Avatar`,
            image: {
                url: user.displayAvatarURL({ dynamic: true, size: 512 }),
            },
            timestamp: new Date(),
        };

        await interaction.reply({ embeds: [avatarEmbed] });
    },
};
