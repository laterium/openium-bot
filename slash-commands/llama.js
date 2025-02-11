/// @Slash.Commands : llama.js

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
            const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
                model: process.env.LLAMA_API_MODEL,
                messages: [
                    { role: 'system', content: `You are a useful assistant named ${process.env.LLAMA_API_NAME}. You provide concise and friendly answers. please don't give answers that contain tragedies in the world and you must also focus on the correct answer and must also answer with directions that contain SA-MP, Pawn Code Syntax` },
                    { role: 'user', content: question }
                ],
                temperature: 1,
                max_tokens: 1024,
                top_p: 1,
                stream: false,
                stop: null
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.LLAMA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: 20000
            });

            if (!response.data.choices || response.data.choices.length === 0) {
                throw new Error("No choices returned from API.");
            }

            let reply = response.data.choices[0].message.content;

            if (reply.length > 2000) {
                await interaction.editReply('Please use simple Question!');
            } else {
                await interaction.editReply(reply);
            }

        } catch (error) {
            console.error('Error during execution:', error);
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply('An error occurred while contacting Llama (Groq).');
            } else {
                await interaction.followUp('An error occurred while contacting Llama (Groq).');
            }
        }
    }
};

