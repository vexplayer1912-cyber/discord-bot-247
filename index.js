const sodium = require("libsodium-wrappers");
const { Client, GatewayIntentBits, Events } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

(async () => {
  // 🔐 ESPERA o libsodium carregar
  await sodium.ready;

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });

  client.once(Events.ClientReady, async (client) => {
    console.log(`🤖 Bot ligado como ${client.user.tag}`);

    try {
      const guild = await client.guilds.fetch(process.env.GUILD_ID);
      if (!guild) return console.log("❌ Guild não encontrada");

      const channel = await guild.channels.fetch(process.env.VOICE_CHANNEL_ID);
      if (!channel || !channel.isVoiceBased()) {
        return console.log("❌ Canal de voz inválido");
      }

      joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: false,
      });

      console.log("🎧 Bot entrou na call com sucesso");
    } catch (err) {
      console.error("❌ Erro ao entrar na call:", err);
    }
  });

  client.login(process.env.TOKEN);
})();
