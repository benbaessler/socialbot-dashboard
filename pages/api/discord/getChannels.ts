require('dotenv').config()

// @ts-ignore
const handler = async (req, res) => {
  const { guildId } = req.query;

  try {
    const response = await fetch(
      `https://discord.com/api/guilds/${guildId}/channels`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );
    res.status(200).json(await response.json());
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Server Error",
    });
  }
};

export default handler;
