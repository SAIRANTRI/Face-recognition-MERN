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
  
      const uploads = await Photo.find({ user: user._id }).sort({ createdAt: -1 });
  
      res.status(200).json({
        total: uploads.length,
        uploads,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error while fetching upload history" });
    }
  };
  