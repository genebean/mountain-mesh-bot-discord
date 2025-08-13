require('dotenv').config();
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // Required for guildMemberAdd event
    // GatewayIntentBits.DirectMessages // Required to send DMs
  ],
  partials: ['CHANNEL'] // Needed to receive/send DMs
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async member => {
  // Send DM to the new member
  // try {
  //   await member.send(
  //     `Hey ${member.user.username}, welcome to the Mountain Mesh Discord!\n` +
  //     `We're a friendly group and look forward to getting to know you.`
  //   );
  // } catch (error) {
  //   console.log(`Couldn't send DM to ${member.user.tag}. They might have DMs disabled.`);
  // }

  // Send welcome message in the server's system channel or first text channel
  const channel = member.guild.systemChannel || member.guild.channels.cache.find(ch => ch.type === 0); // 0 = GuildText
  if (!channel) return;

  channel.send(`Welcome ${member}, are you already meshing with us or just getting started?`);
});

client.login(process.env.DISCORD_TOKEN);
