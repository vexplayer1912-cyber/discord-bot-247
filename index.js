const express = require("express");
const app = express();

const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

// ===== SERVIDOR HTTP (OBRIGATÓRIO NO KOYEB) =====
app.get("/", (req, res) => {
  res.send("Bot online 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor HTTP ativo na porta ${PORT}`);
});

// ===== DISCORD BOT =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", () => {
  console.log(`🤖 Bot ligado como ${client.user.tag}`);

  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) {
    console.log("❌ Guild não encontrada");
    return;
  }

  const channel = guild.channels.cache.get(process.env.VOICE_CHANNEL_ID);
  if (!channel) {
    console.log("❌ Canal de voz não encontrado");
    return;
  }

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
  });

  console.log("🎧 Bot entrou na call");
});

client.login(process.env.TOKEN);
