/// @App : app.js

const { Collection, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const mMysql = require('./mysql');
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('colors');
require('ts-node/register');
require('dotenv').config();

const { Erine, GatewayIntentBits } = require("erine");

const _prefix = process.env.APP_PREFIX || '!';

const app = new Erine({
    intents: Object.values(GatewayIntentBits),
    prefix: _prefix
});

app.commands = new Collection();
app.buttons = new Collection();
app.modals = new Collection();
app.selectMenus = new Collection();

module.exports = app;

console.log(`
                                           ooooo ooooo     ooo ooo        ooooo
                                           \`888' \`888'     \`8' \`88.       .888'
 .ooooo.  oo.ooooo.   .ooooo.  ooo. .oo.    888   888       8   888b     d'888
d88' \`88b  888' \`88b d88' \`88b \`888P"Y88b   888   888       8   8 Y88. .P  888
888   888  888   888 888ooo888  888   888   888   888       8   8  \`888'   888
888   888  888   888 888    .o  888   888   888   \`88.    .8'   8    Y     888
\`Y8bod8P'  888bod8P' \`Y8bod8P' o888o o888o o888o    \`YbodP'    o8o        o888o
           888
          o888o

` .yellow);

const token = process.env.APP_TOKEN;
const config = require('./config.json');

const eventsPath = path.join(__dirname, 'events'); // @path : events
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    delete require.cache[require.resolve(filePath)];

    const event = require(filePath);
    if (event.once) {
        app.once(event.name, (...args) => event.execute(...args, app));
    } else {
        app.on(event.name, (...args) => event.execute(...args, app));
    }
}

const ___deploy = require('./deploy');
const ___loadDirPath = require('./dirpath');

(async () => {
    try {
        await ___deploy();
        await ___loadDirPath();

        if (!token) {
            console.error('TOKEN is not defined in the environment variables.'.red);
            process.exit(1);
        }

        require('./typescript/app.ts');

        await app.login(token);

        app.once('ready', () => {
            console.log(`(js) Logged in as ${app.user.tag}`.yellow);

            app.user.setPresence({
                activities: [{
                    name: 'openIUM Bot & AI | 100% Open Source Project',
                    type: ActivityType.Listening
                }]
            });
        });

    } catch (error) {
        console.error("(js) Error Logged Application".red, error);
        process.exit(1);
    }
})();
