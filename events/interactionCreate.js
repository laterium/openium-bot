/// @Events : Events.InteractionCreate

const app = require('../app.js');
const { Events } = require('discord.js');
const { MessageFlags } = require('discord-api-types/v10');
require('colors');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, app) {
        if (interaction.isCommand()) {
            const command = app.commands.get(interaction.commandName);

            if (!command) {
                console.error(`Command ${interaction.commandName} not found.` .red);
                return;
            }

            try {
                await command.execute(interaction, app);
            } catch (error) {
                console.error(`Error executing command ${interaction.commandName}:`, error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    flags: MessageFlags.Ephemeral,
                });
            }
        }

        else if (interaction.isButton()) {
            const button = app.buttons.get(interaction.customId);

            if (!button) {
                console.error(`Button ${interaction.customId} not found.` .red);
                return;
            }

            try {
                await button.execute(interaction, app);
            } catch (error) {
                console.error(`Error executing button ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'There was an error while handling this button!',
                    flags: MessageFlags.Ephemeral,
                });
            }
        }

        else if (interaction.isStringSelectMenu()) {
            const selectMenu = app.selectMenus.get(interaction.customId);

            if (!selectMenu) {
                console.error(`Select menu ${interaction.customId} not found.` .red);
                return;
            }

            try {
                await selectMenu.execute(interaction, app);
            } catch (error) {
                console.error(`Error executing select menu ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'There was an error while handling this select menu!',
                    flags: MessageFlags.Ephemeral,
                });
            }
        }

        else if (interaction.isModalSubmit()) {
            const modal = app.modals.get(interaction.customId);

            if (!modal) {
                console.error(`Modal ${interaction.customId} not found.` .red);
                return;
            }

            try {
                await modal.execute(interaction, app);
            } catch (error) {
                console.error(`Error executing modal ${interaction.customId}:`, error);
                await interaction.reply({
                    content: 'There was an error while handling this modal!',
                    flags: MessageFlags.Ephemeral,
                });
            }
        }
    },
};
