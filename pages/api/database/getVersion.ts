import VersionManager from "@/models/VersionManager";
import connectDB from '@/utils/db';

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

};

export default handler;