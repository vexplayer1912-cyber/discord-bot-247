const express = require("express");
const app = express();

const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

app.get("/", (req, res) => {
  res.send("Bot online 🚀");
});

app.listen(3000, () => {
  console.log("🌐 Servidor HTTP ativo");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", () => {
  console.log(`Bot ligado como ${client.user.tag}`);

  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) return console.log("❌ Guild não encontrada");

  const channel = guild.channels.cache.get(process.env.VOICE_CHANNEL_ID);
  if (!channel) return console.log("❌ Canal de voz não encontrado");

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
  });

  console.log("🎧 Bot entrou na call");
});

client.login(process.env.TOKEN);
