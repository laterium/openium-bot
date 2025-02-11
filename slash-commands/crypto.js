/// @Slash.Commands : crypto.js

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('crypto')
        .setDescription('Check the current prices of multiple cryptocurrencies'),
    async execute(interaction) {
        try {
            await interaction.deferReply();

            const res_img = await axios.get('https://randomfox.ca/floof/');
            const coins = ['bitcoin', 'dogecoin', 'ethereum', 'litecoin', 'cardano'];
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`);

            let imagUrl;
            imageUrl = res_img.data.image;

            const embed = new EmbedBuilder()
                .setColor('Yellow')
                .setTitle('Cryptocurrency Prices')
                .setImage(imageUrl)
                .setTimestamp();

            coins.forEach(coin => {
                const price = response.data[coin]?.usd || 0;
                embed.addFields({ name: coin.toUpperCase(), value: `🪙 **$${price.toLocaleString()}** USD`, inline: true });
            });

            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.editReply('❌ Failed to fetch cryptocurrency prices. Please try again later.');
        }
    },
};
