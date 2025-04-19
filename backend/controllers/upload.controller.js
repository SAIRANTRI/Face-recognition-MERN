import cloudinary from 'cloudinary';
import Photo from '../models/photo.model.js'; // Assuming you have a Photo model to store image URLs

// Function to upload reference image
export const uploadReferenceImage = async (req, res) => {
  try {
    const { file } = req.files; // Assume you're using a file upload middleware like 'express-fileupload'

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
    const { files } = req.files; // Assuming multiple files are uploaded

    // Loop through each uploaded image
    const uploadedImages = [];
    for (let file of files) {
      const uploadedImage = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: 'albumify/pool_images',
        public_id: `pool_${Date.now()}`,
      });

      // Save each pool image URL and metadata in your database
      const newPoolImage = new Photo({
        userId: req.user.id, // Assuming user ID is stored in req.user
        imageUrl: uploadedImage.secure_url,
        imageType: 'pool', // Mark as pool image
        uploadedAt: new Date(),
      });

      await newPoolImage.save();
      uploadedImages.push(uploadedImage.secure_url);
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
