/// @Slash.Commands : groq.js

const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('openium')
        .setDescription('Ask something to openIUM')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question you want to ask')
                .setRequired(true)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        await interaction.deferReply();

        try {
            const allowTragedies = process.env.ALLOW_TRAGEDIES === 'true';

            const systemMessage = allowTragedies
                ? `You are a useful assistant named ${process.env.GROQ_API_NAME}. You provide concise and friendly answers. Please focus on providing accurate answers.`
                : `You are a useful assistant named ${process.env.GROQ_API_NAME}. You provide concise and friendly answers. Please avoid discussing any tragic events or negative topics.`;

            const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
                model: process.env.GROQ_API_MODEL,
                messages: [
                    { role: 'system', content: systemMessage },
                    { role: 'user', content: question }
                ],
                temperature: 1,
                max_tokens: 1024,
                top_p: 1,
                stream: false,
                stop: null
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 20000
            });

            if (!response.data.choices || response.data.choices.length === 0) {
                throw new Error("No choices returned from API.");
            }

            let reply = response.data.choices[0].message.content;

            if (reply.length > 2000) {
                await interaction.editReply('Please use simpler questions!');
            } else {
                await interaction.editReply(reply);
            }

        } catch (error) {
            console.error('Error during execution:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply('An error occurred while contacting GROQ (https://groq.com/).');
            } else {
                await interaction.followUp('An error occurred while contacting GROQ (https://groq.com/).');
            }
        }
    }
};


