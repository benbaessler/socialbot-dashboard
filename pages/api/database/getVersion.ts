import VersionManager from "@/models/VersionManager";
import { connectDB, disconnectDB } from "@/utils";

// @ts-ignore
const handler = async (req, res) => {
  await connectDB();

  try {
    const [versionManager] = await VersionManager.find({});
    res
      .status(200)
      .json({ version: versionManager.version, description: versionManager.description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }

  await disconnectDB();
};

export default handler;