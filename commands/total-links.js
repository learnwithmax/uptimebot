const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('total-links')
    .setDescription('View total number of Glitch links in the uptime system'),
  async execute(interaction) {
    const links = JSON.parse(fs.readFileSync(path.join(__dirname, '../links.json')));
    await interaction.reply({ content: `Total links: ${links.length}`, ephemeral: true });
  },
};
