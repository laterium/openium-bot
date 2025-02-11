/// @Deploy : deploy.js

const { REST, Routes, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('colors');
require('dotenv').config();

const app = require('./app.js');

const rest = new REST({ version: '10' }).setToken(process.env.APP_TOKEN);
const commands = [];
const commandsPath = path.join(__dirname, 'slash-commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.push(command.data.toJSON());
    app.commands.set(command.data.name, command);
}

async function deployCommands(guildId) {
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.APP_ID, guildId),
            { body: commands }
        );
        console.log(`(js) (deploy.js) Slash commands registered for guild ${guildId}.`.green);
    } catch (error) {
        console.error(`(js) (deploy.js) Failed to register slash commands for guild ${guildId}:`.red, error);
    }
}

app.on('guildCreate', async (guild) => {
    console.log(`(js) (deploy.js) Bot added to new guild: ${guild.id}`.blue);
    await deployCommands(guild.id);
});

(async () => {
    try {
        console.log('(js) (deploy.js) Fetching bot guilds...'.cyan);

        const guilds = await rest.get(Routes.userGuilds());

        const guildIds = guilds.map(guild => guild.id);
        console.log(`(js) (deploy.js) Found ${guildIds.length} guilds.`.yellow);

        for (const guildId of guildIds) {
            await deployCommands(guildId);
        }

        console.log('(js) (deploy.js) All slash commands registered successfully.'.yellow);
    } catch (error) {
        console.error('(js) (deploy.js) Failed to register slash commands:'.red, error);
    }
})();

module.exports = async function deploy() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3090);
    });
};
