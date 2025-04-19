import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageType: {
      type: String,
      enum: ['reference', 'pool'], // To differentiate between reference and pool images
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;
