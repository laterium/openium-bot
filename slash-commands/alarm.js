/// @Slash.Commands : alarm.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alarm')
        .setDescription('Set an alarm for a specific time')
        .addIntegerOption(option =>
            option.setName('hours')
                .setDescription('Hours from now to set the alarm')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('minutes')
                .setDescription('Minutes from now to set the alarm')
                .setRequired(true)),
    async execute(interaction) {
        const hours = interaction.options.getInteger('hours');
        const minutes = interaction.options.getInteger('minutes');
        const totalMilliseconds = (hours * 3600000) + (minutes * 60000);

        setTimeout(() => {
            interaction.reply(`⏰ Alarm! It's time! ⏰`);
        }, totalMilliseconds);

        await interaction.reply(`Alarm set for ${hours} hour(s) and ${minutes} minute(s) from now.`);
    },
};
