/// @Slash.Commands : trivia.js

const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Start a random trivia quiz'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
            const data = response.data.results[0];
            const question = data.question;
            const correctAnswer = data.correct_answer;
            const incorrectAnswers = data.incorrect_answers;
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

