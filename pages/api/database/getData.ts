import Instance from "@/models/Instance";
import Stats from "@/models/Stats";
import { connectDB, disconnectDB } from "@/utils";

// @ts-ignore
const handler = async (req, res) => {
  await connectDB();
  
  const { guildId } = req.query;

  try {
    const instancesRes = await Instance.find({ guildId });
    const statsRes = await Stats.findOne({ guildId });

    const instances = instancesRes.map((instance) => instance.toObject());
    const stats = statsRes.toObject();

    res.status(200).json({ instances, stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
  await disconnectDB();
};

export default handler;
