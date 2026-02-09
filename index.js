const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const http = require("http");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", async () => {
  console.log("✅ Bot logado");

  console.log("GUILD_ID =", process.env.GUILD_ID);
  console.log("VOICE_CHANNEL_ID =", process.env.VOICE_CHANNEL_ID);

  let guild;
  try {
    guild = await client.guilds.fetch(process.env.GUILD_ID);
    console.log("✅ Guild encontrada:", guild.name);
  } catch (e) {
    return console.log("❌ ERRO AO BUSCAR GUILD");
  }

  const channel = guild.channels.cache.get(process.env.VOICE_CHANNEL_ID);

  if (!channel) {
    return console.log("❌ Canal NÃO encontrado");
  }

  console.log("✅ Canal encontrado:", channel.name, "| Tipo:", channel.type);

  try {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfMute: true,
      selfDeaf: false,
    });
    console.log("🎧 Tentativa de entrar na call feita");
  } catch (e) {
    console.log("❌ ERRO AO ENTRAR NA CALL", e);
  }
});

client.login(process.env.TOKEN);

// HTTP keep-alive
http.createServer((req, res) => {
  res.end("ok");
}).listen(process.env.PORT || 8000);
