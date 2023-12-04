import type { NextApiRequest, NextApiResponse } from "next";
import Instance from "@/models/Instance";
import connectDB from "@/utils/db";

// @ts-ignore
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  const {
    guildId,
    channelId,
    handle,
    profileId,
    ownedBy,
    includeComments,
    includeMirrors,
    includeInteractions,
    mention,
  } = req.query;

  try {
    const channelInstance = await Instance.findOne({
      guildId,
      channelId,
    });

    let webhookUrl = "";
    if (!channelInstance) {
      const response = await fetch(
        `https://discord.com/api/channels/${channelId}/webhooks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          },
          body: JSON.stringify({
            name: "Social Bot",
            avatar: "https://i.imgur.com/GGXvzmz.png",
          }),
        }
      );

      const data = await response.json();

      webhookUrl = data.url;
    } else {
      webhookUrl = channelInstance.webhookUrl;
    }

    const newInstance = new Instance({
      guildId,
      channelId,
      handle,
      profileId,
      ownedBy,
      includeComments,
      includeMirrors,
      includeInteractions,
      mention,
      webhookUrl,
    });
    await newInstance.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error creating instance:", error);
    res.status(500).json({ error: "Failed to create instance" });
  }
};

export default handler;
