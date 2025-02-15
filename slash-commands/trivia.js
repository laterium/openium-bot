/// @Slash.Commands : trivia.js

const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Start a random trivia quiz'),

    async execute(interaction) {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
            const data = await response.json();
            const question = data.results[0].question;
            const correctAnswer = data.results[0].correct_answer;
            const incorrectAnswers = data.results[0].incorrect_answers;
            const options = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);

            let pollDescription = `**Trivia Question:**\n${question}\n\n`;
            options.forEach((option, index) => {
                pollDescription += `${index + 1}. ${option}\n`;
            });

            await interaction.reply({
                content: pollDescription,
                fetchReply: true
            });

            const filter = m => m.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

            collector.on('collect', m => {
                if (m.content.toLowerCase() === correctAnswer.toLowerCase()) {
                    interaction.followUp('Correct! 🎉');
                } else {
                    interaction.followUp(`Wrong! The correct answer was: ${correctAnswer}`);
                }
                collector.stop();
            });

        } catch (error) {
            console.error(error);
            await interaction.reply('Sorry, I encountered an error while fetching trivia.');
        }
    },
};
