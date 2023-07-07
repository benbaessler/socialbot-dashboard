require("dotenv").config();

// @ts-ignore
const handler = async (req, res) => {
  const { channelId } = req.query;

  try {
    const response = await fetch(
      `https://discord.com/api/channels/${channelId}`,
      {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      }
    );
    res.status(200).json(await response.json());
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

export default handler;
