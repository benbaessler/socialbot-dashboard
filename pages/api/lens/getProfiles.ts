import { lensClient } from "@/utils";
import { LENS_API } from "@/utils/constants";
import { request } from "graphql-request";

// @ts-ignore
const handler = async (req, res) => {
  const { profileIds } = req.query;
  const parsed = profileIds.replace("profileIds=", "").split(",");

  try {
    const profiles = await lensClient.profile.fetchAll({
      profileIds: parsed,
    });
    res.status(200).json({ profiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export default handler;
