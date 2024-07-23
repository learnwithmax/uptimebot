const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link-add')
    .setDescription('Add a new Glitch link to the uptime system')
    .addStringOption(option =>
      option.setName('link')
        .setDescription('The link to add')
        .setRequired(true)),
  async execute(interaction) {
    const link = interaction.options.getString('link');
    let links = JSON.parse(fs.readFileSync(path.join(__dirname, '../links.json')));
    if (links.includes(link)) {
      return interaction.reply({ content: 'This link is already added.', ephemeral: true });
    }
    links.push(link);
    fs.writeFileSync(path.join(__dirname, '../links.json'), JSON.stringify(links));
    await interaction.reply({ content: `Link ${link} added successfully!`, ephemeral: true });
  },
};
