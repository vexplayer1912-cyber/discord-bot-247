const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", () => {
  console.log(`🤖 Bot ligado como ${client.user.tag}`);
});

client.on("ready", async () => {
  const GUILD_ID = "1462211324439167122";
  const VOICE_CHANNEL_ID = "1462277982189129938";

  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);

  if (!channel) return console.log("Canal não encontrado");

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: false,
  });

  console.log("🎧 Entrei na call!");
});

client.login(process.env.TOKEN);

const http = require("http");

const PORT = process.env.PORT || 8000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Bot online 24/7");
}).listen(PORT, () => {
  console.log("Servidor HTTP ativo na porta", PORT);
});
