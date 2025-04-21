import Result from '../models/result.model.js';

// Get all results for a user
export const getAllResultsForUser = async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find all results for the user
      const results = await Result.find({ user: user._id })
        .populate('photos', 'imageUrl label confidence');
  
      if (!results || results.length === 0) {
        return res.status(404).json({ message: 'No results found for this user' });
      }
  
      res.status(200).json({
        total: results.length,
        results,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while fetching results' });
    }
  };
  

// Get a specific result by ID
export const getResultById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user;
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the result for the user by result ID
      const result = await Result.findOne({ _id: id, user: user._id })
        .populate('photos', 'imageUrl label confidence');
  
      if (!result) {
        return res.status(404).json({ message: 'Result not found for this user' });
      }
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while fetching result by ID' });
    }
  };
  
