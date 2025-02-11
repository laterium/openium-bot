/// @Slash.Commands : random.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random')
        .setDescription('Replies with a random cat, dog, or fox image/gif!')
        .addStringOption(option =>
            option.setName('animal')
                .setDescription('Choose between cat, dog, or fox')
                .setRequired(true)
                .addChoices(
                    { name: 'Cat', value: 'cat' },
                    { name: 'Dog', value: 'dog' },
                    { name: 'Fox', value: 'fox' }
                )),
    async execute(interaction) {
        await interaction.deferReply();

        const animal = interaction.options.getString('animal');
        let url;

        switch (animal) {
            case 'cat':
                url = 'https://api.thecatapi.com/v1/images/search';
                break;
            case 'dog':
                url = 'https://dog.ceo/api/breeds/image/random';
                break;
            case 'fox':
                url = 'https://randomfox.ca/floof/';
                break;
            default:
                return interaction.editReply('Invalid animal selection.');
        }

        try {
            const response = await axios.get(url);
            let imageUrl;

            if (animal === 'cat') {
                imageUrl = response.data[0].url;
            } else if (animal === 'dog') {
                imageUrl = response.data.message;
            } else if (animal === 'fox') {
                imageUrl = response.data.image;
            }

            const embed = new EmbedBuilder()
                .setColor(0xFFFF00)
                .setTitle(`Here's a random ${animal} for you!`)
                .setImage(imageUrl)
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('Sorry, something went wrong while fetching the image.');
        }
    },
};
