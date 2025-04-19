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
  