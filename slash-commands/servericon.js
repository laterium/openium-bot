/// @Slash.Commands : servericon.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('servericon')
        .setDescription('Displays the server icon!'),
    async execute(interaction) {
        const serverIconEmbed = {
            color: 0xFFFF00,
            title: `${interaction.guild.name}'s Icon`,
            image: {
                url: interaction.guild.iconURL({ dynamic: true, size: 512 }),
            },
            timestamp: new Date(),
        };

        await interaction.reply({ embeds: [serverIconEmbed] });
    },
};
