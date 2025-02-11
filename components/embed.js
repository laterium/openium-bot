/// @components : embed.js

/* @example
    const embedBuilder = require('./components/embed.js');
    const embed = embedBuilder.createEmbed('Hello!', 'This is a test embed message.');
    message.channel.send({ embeds: [embed] });
*/

const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'embedBuilder',
    description: 'Utility to create Discord embeds',
    createEmbed: (title, description, color = '#0099ff') => {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp();
    }
};
