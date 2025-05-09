import Photo from "../models/photo.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserUploadHistory = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetching reference images
    const referenceImages = await Photo.find({ userId: user._id, imageType: 'reference' }).sort({ createdAt: -1 });

    // Fetching pool images
    const poolImages = await Photo.find({ userId: user._id, imageType: 'pool' }).sort({ createdAt: -1 });

    res.status(200).json({
      totalReferences: referenceImages.length,
      totalPools: poolImages.length,
      referenceImages,
      poolImages,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching upload history" });
  }
};
