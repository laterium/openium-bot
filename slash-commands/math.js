/// @Slash.Commands : math.js

const { SlashCommandBuilder } = require('discord.js');
const math = require('mathjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('math')
        .setDescription('Calculate a math expression')
        .addStringOption(option =>
            option.setName('expression')
                .setDescription('The mathematical expression to calculate')
                .setRequired(true)),

    async execute(interaction) {
        const expression = interaction.options.getString('expression');

        try {
            const result = math.evaluate(expression);
            await interaction.reply(`The result of "${expression}" is: ${result}`);
        } catch (error) {
            await interaction.reply('Sorry, I could not calculate that. Please check your expression and try again.');
        }
    },
};
