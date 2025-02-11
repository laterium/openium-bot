/// @components : calculate.js

/* @example
    client.on('messageCreate', (message) => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'calculate') {
            const calculate = require('./components/calculate');
            calculate.execute(message, args);
        }
    });
*/

module.exports = {
    name: 'calculate',
    description: 'Utility to perform basic calculations',
    execute: (message, args) => {
        const expression = args.join(' ');
        try {
            const result = eval(expression);
            message.reply(`Result: ${result}`);
        } catch (error) {
            message.reply('Invalid expression!');
        }
    }
};
