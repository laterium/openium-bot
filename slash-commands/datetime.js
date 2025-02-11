/// @Slash.Commands : datetime.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('datetime')
        .setDescription('Shows the current date and time.'),
    async execute(interaction) {
        const res_img = await axios.get('https://randomfox.ca/floof/');

        let imagUrl;
        imageUrl = res_img.data.image;

        const currentDate = new Date();

        const dateEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle('Current Date and Time')
            .setImage(imageUrl)
            .addFields(
                { name: 'Date ?', value: currentDate.toLocaleDateString(), inline: true },
                { name: 'Time ?', value: currentDate.toLocaleTimeString(), inline: true }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [dateEmbed] });
    },
};
