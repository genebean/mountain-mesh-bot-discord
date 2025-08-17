const { Client, GatewayIntentBits, PresenceUpdateStatus, ActivityType } = require('discord.js');

require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers
  ]
});

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus(PresenceUpdateStatus.Online);
  client.user.setActivity('for humans to interact with', { type: ActivityType.Watching });

  const channel = await client.channels.fetch(process.env.CHANNEL_ID)
    .then(console.log("Finished fetching channel."));
});

client.on('guildMemberAdd', async (member) => {
  try {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);

    channel.send(`Welcome ${member.user}, are you already meshing with us or just getting started?`)
      .then(message => console.log(`Sent message: ${message.content}`))
      .catch(console.error);
  } catch (e) {
    console.log(e);
  }
});

client.login(process.env.DISCORD_TOKEN);
