import cloudinary from 'cloudinary';
import Photo from '../models/photo.model.js';
import Result from '../models/result.model.js';

// Function to upload reference image
export const uploadReferenceImage = async (req, res) => {
  try {
    const { file } = req.files;

    // Upload the image to Cloudinary
    const uploadedImage = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: 'albumify/references',
      public_id: `reference_${Date.now()}`,
    });

    // Save the reference image URL and metadata in your database
    const newReference = new Photo({
      userId: req.user.id,
      imageUrl: uploadedImage.secure_url,
      imageType: 'reference',
      uploadedAt: new Date(),
    });

    await newReference.save();

    res.status(200).json({
      message: 'Reference image uploaded successfully',
      imageUrl: uploadedImage.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading reference image', error: error.message });
  }
};

// Function to upload pool images
export const uploadPoolImages = async (req, res) => {
  try {
    const { files } = req.files;

    const uploadedImages = [];

    // Loop through each uploaded image
    for (let file of files) {
      const uploadedImage = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: 'albumify/pool_images',
        public_id: `pool_${Date.now()}`,
      });

      // Save each pool image URL and metadata in your database
      const newPoolImage = new Photo({
        userId: req.user.id,
        imageUrl: uploadedImage.secure_url,
        imageType: 'pool',
        uploadedAt: new Date(),
      });

      await newPoolImage.save();
      uploadedImages.push(uploadedImage.secure_url);

      // Check if the user has uploaded a reference image
      const referenceImage = await Photo.findOne({ userId: req.user.id, imageType: 'reference' });

      if (referenceImage) {
        // Only generate results for new pool images
        const existingResult = await Result.findOne({ user: req.user.id, photo: newPoolImage._id });

        if (!existingResult) {
          await generateResultForUser(req.user.id, newPoolImage._id);
        }
      }
    }

    res.status(200).json({
      message: 'Pool images uploaded successfully',
      images: uploadedImages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading pool images', error: error.message });
  }
};

// Function to generate result based on the pool image
const generateResultForUser = async (userId, poolImageId) => {
  try {
    const referenceImage = await Photo.findOne({ userId, imageType: 'reference' });
    const poolImage = await Photo.findById(poolImageId);  // Get the specific pool image

    if (!referenceImage || !poolImage) {
      throw new Error('Both reference and pool images must be uploaded');
    }

    // Example logic for result generation (replace with actual image comparison logic)
    const label = poolImage._id % 2 === 0 ? "Match" : "No Match";
    const confidence = poolImage._id % 2 === 0 ? 0.95 : 0.50;

    // Save the result to the database
    const newResult = new Result({
      user: userId,
      photo: poolImage._id,
      label: label,
      confidence: confidence,
    });

    await newResult.save();
  } catch (error) {
    console.error(error);
    throw new Error('Error generating result for user');
  }
};
