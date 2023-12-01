import { lensClient } from "@/utils";

// @ts-ignore
const handler = async (req, res) => {
  const { profileIds } = req.query;
  const parsed = profileIds.replace("profileIds=", "").split(",");

  try {
    const profiles = await lensClient.profile.fetchAll({
      where: { profileIds: parsed },
    });
    res.status(200).json({ profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export default handler;
