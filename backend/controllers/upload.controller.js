import cloudinary from 'cloudinary';
import Photo from '../models/photo.model.js';
import Result from '../models/result.model.js';

// Function to upload reference image
export const uploadReferenceImage = async (req, res) => {
  try {
    const { file } = req.files;

    // Check if file is uploaded
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

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

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadedImages = [];
    const referenceImage = await Photo.findOne({ userId: req.user.id, imageType: 'reference' });

    if (!referenceImage) {
      return res.status(400).json({ message: 'Reference image is required to upload pool images' });
    }

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
        referenceId: referenceImage._id,  // Link the pool image with the reference image
      });

      await newPoolImage.save();
      uploadedImages.push(uploadedImage.secure_url);

      // Generate result only if this pool image is new
      const existingResult = await Result.findOne({ user: req.user.id, referenceImage: referenceImage._id });

      if (!existingResult) {
        await generateResultForUser(req.user.id, referenceImage._id);
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
const generateResultForUser = async (userId, referenceId) => {
  try {
    const referenceImage = await Photo.findOne({ userId, imageType: 'reference', _id: referenceId });
    const poolImages = await Photo.find({ userId, imageType: 'pool', referenceId: referenceId });

    if (!referenceImage || poolImages.length === 0) {
      throw new Error('Reference image or pool images missing');
    }

    const matchedPhotos = [];

    // Loop through the pool images and apply match logic
    for (const image of poolImages) {
      // Mock match logic: ObjectId timestamp is even (for testing purposes)
      const timestamp = parseInt(image._id.toString().substring(0, 8), 16);
      if (timestamp % 2 === 0) {
        matchedPhotos.push(image._id);
      }
    }

    if (matchedPhotos.length > 0) {
      const newResult = new Result({
        user: userId,
        referenceImage: referenceImage._id,  // Link the result with the reference image
        poolImages: matchedPhotos,  // Store matched pool images
        label: 'Matches Found',
        confidence: 0.95,  // Mock confidence
      });

      await newResult.save();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error generating result for user');
  }
};
