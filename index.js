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
  const GUILD_ID = "COLOQUE_ID_DO_SERVIDOR";
  const VOICE_CHANNEL_ID = "COLOQUE_ID_DA_CALL";

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
