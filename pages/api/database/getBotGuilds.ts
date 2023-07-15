import { connectDB, disconnectDB } from "@/utils";
import Stats from "@/models/Stats";

// @ts-ignore
const handler = async (req, res) => {
  await connectDB();

  try {
    const stats = await Stats.find({});
    const guilds = [...new Set(stats.map((stat) => stat.guildId))];
    res.status(200).json({ guilds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
  await disconnectDB();
};

export default handler;
