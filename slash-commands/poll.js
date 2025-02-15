/// @Slash.Commands : poll.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll with random options')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question for the poll')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Comma-separated list of options for the poll (minimum 12 options)')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const optionsString = interaction.options.getString('options');
        const options = optionsString.split(',').map(option => option.trim()).filter(option => option.length > 0);

        if (options.length < 12) {
            return interaction.reply('Please provide at least 12 options for the poll.');
        }

        let pollDescription = `**${question}**\n\n`;

        options.forEach((option, index) => {
            const emoji = String.fromCodePoint(0x0031 + index, 0x20E3); // Emoji 1️⃣, 2️⃣, 3️⃣...
            pollDescription += `${emoji} ${option}\n`;
        });

        const pollMessage = await interaction.reply({
            content: pollDescription,
            fetchReply: true
        });

        for (let i = 0; i < options.length; i++) {
            const emoji = String.fromCodePoint(0x0031 + i, 0x20E3); // Emoji 1️⃣, 2️⃣, 3️⃣...
            await pollMessage.react(emoji);
        }
    },
};
