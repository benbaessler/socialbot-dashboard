import type { NextApiRequest, NextApiResponse } from "next";
import Instance from "@/models/Instance";
import { connectDB } from "@/utils";

// @ts-ignore
const handler = async (req, res) => {
  await connectDB();

  const {
    guildId,
    channelId,
    handle,
    profileId,
    ownedBy,
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
            name: "Lens Echo",
            avatar: "https://i.imgur.com/u03AmLH.png",
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      webhookUrl = data.url;

      console.log("Create webhook:", response.status);
    } else {
      webhookUrl = channelInstance.webhookUrl;
    }

    const newInstance = new Instance({
      guildId,
      channelId,
      handle,
      profileId,
      ownedBy,
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
