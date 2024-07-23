const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ./commands/${file} is missing a required "data" or "execute" property.`);
  }
}

client.once(Events.ClientReady, () => {
  console.log('Bot is online!');
  setInterval(pingLinks, 60000); // Ping every 1 minute
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

const pingLinks = () => {
  const links = JSON.parse(fs.readFileSync(path.join(__dirname, 'links.json')));
  links.forEach(link => {
    axios.get(link)
      .then(response => {
        console.log(`Successfully pinged ${link}: ${response.status}`);
      })
      .catch(error => {
        console.error(`Error pinging ${link}: ${error.message}`);
      });
  });
};

client.login(process.env.TOKEN);
