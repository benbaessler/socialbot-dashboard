import Instance from "@/models/Instance";
import { connectDB } from "@/utils";

// @ts-ignore
const handler = async (req, res) => {
  await connectDB();

  const { guildId, handle, channelId } = req.query;

  try {
    const update = await Instance.deleteOne({ guildId, channelId, handle });

    res.status(200).json({ success: update.acknowledged });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export default handler;
