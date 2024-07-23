const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('my-links')
    .setDescription('View your Glitch links'),
  async execute(interaction) {
    const links = JSON.parse(fs.readFileSync(path.join(__dirname, '../links.json')));
    if (links.length === 0) {
      return interaction.reply({ content: 'No links found.', ephemeral: true });
    }
    await interaction.reply({ content: `Your links:\n${links.join('\n')}`, ephemeral: true });
  },
};
