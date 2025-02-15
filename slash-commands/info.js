/// @Slash.Commands : stats.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Displays basic information about your Discord account.'),
    async execute(interaction) {
        const user = interaction.user;

        const embed = {
            color: 0xFFFF00,
            title: 'Discord Account Information',
            fields: [
                {
                    name: 'Username',
                    value: user.username,
                    inline: true,
                },
                {
                    name: 'Tag',
                    value: `#${user.discriminator}`,
                    inline: true,
                },
                {
                    name: 'ID',
                    value: user.id,
                    inline: true,
                },
                {
                    name: 'Account Created On',
                    value: user.createdAt.toUTCString(),
                    inline: false,
                },
                {
                    name: 'Is Bot?',
                    value: user.bot ? 'Yes' : 'No',
                    inline: true,
                },
            ],
            thumbnail: {
                url: user.displayAvatarURL({ dynamic: true }),
            },
            timestamp: new Date(),
            footer: {
                text: `Requested by ${user.username}`,
                icon_url: user.displayAvatarURL({ dynamic: true }),
            },
        };

        await interaction.reply({ embeds: [embed] });
    },
};
