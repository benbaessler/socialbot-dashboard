import { lensClient, parseHandle } from "@/utils";

// @ts-ignore
const handler = async (req, res) => {
  const { handle } = req.query;

  try {
    const profile = await lensClient.profile.fetch({
      forHandle: parseHandle(handle),
    });
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching profile" });
  }
};

export default handler;
