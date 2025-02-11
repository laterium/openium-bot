/// @Slash.Commands : ping.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong! ^__^'),
    async execute(interaction) {
        const userPing = Date.now() - interaction.createdTimestamp;

        const botPing = interaction.client.ws.ping;

        const pingEmbed = new EmbedBuilder()
            .setColor(0xFFFF00)
            .setTitle('Pong! ^__^')
            .addFields(
                { name: 'Bot Ping', value: `${botPing}ms`, inline: true },
                { name: 'Your Ping', value: `${userPing}ms`, inline: true }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [pingEmbed] });
    },
};
