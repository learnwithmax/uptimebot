const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link-delete')
    .setDescription('Delete a Glitch link from the uptime system')
    .addStringOption(option =>
      option.setName('link')
        .setDescription('The link to delete')
        .setRequired(true)),
  async execute(interaction) {
    const link = interaction.options.getString('link');
    let links = JSON.parse(fs.readFileSync(path.join(__dirname, '../links.json')));
    links = links.filter(l => l !== link);
    fs.writeFileSync(path.join(__dirname, '../links.json'), JSON.stringify(links));
    await interaction.reply({ content: `Link ${link} deleted successfully!`, ephemeral: true });
  },
};
