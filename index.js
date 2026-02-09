const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const http = require("http");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// 🔒 Keep-alive (IMPORTANTE pro Koyeb)
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot online");
}).listen(process.env.PORT || 3000);

function connectToVoice() {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) return console.log("❌ Guild não encontrada");

  const channel = guild.channels.cache.get(process.env.VOICE_CHANNEL_ID);
  if (!channel) return console.log("❌ Canal de voz não encontrado");

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
    selfMute: false,
  });

  console.log("🎧 Bot conectado à call");
}

client.once("ready", () => {
  console.log(`✅ Bot ligado como ${client.user.tag}`);
  connectToVoice();
});

// 🔁 Se cair da call, volta
client.on("voiceStateUpdate", (oldState, newState) => {
  if (
    oldState.member?.id === client.user.id &&
    oldState.channelId &&
    !newState.channelId
  ) {
    console.log("⚠️ Bot caiu da call, reconectando...");
    setTimeout(connectToVoice, 3000);
  }
});

client.login(process.env.TOKEN);
