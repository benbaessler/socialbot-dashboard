import Instance from "@/models/Instance";
import { connectDB } from "@/utils";

// @ts-ignore
const handler = async (req, res) => {
  await connectDB();

  const { guildId, handle, channelId, mirrors, collects, mentions } = req.query;
  console.log(req.query);

  try {
    const update = await Instance.updateOne(
      { guildId, channelId, handle },
      {
        includeMirrors: mirrors,
        includeInteractions: collects,
        mention: mentions,
      }
    );

    res.status(200).json({ success: update.acknowledged });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export default handler;
