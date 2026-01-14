import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  scriptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Script',
    required: true,
    unique: true,
  },
  videoUrl: {
    type: String, // URL to video in cloud storage
  },
  thumbnailUrl: {
    type: String, // URL to thumbnail image
  },
  status: {
    type: String,
    enum: ['Pending', 'Generating', 'Completed', 'Failed'],
    default: 'Pending',
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  duration: {
    type: Number, // Duration in seconds
  },
  error: {
    type: String, // Error message if generation failed
  },
}, {
  timestamps: true,
});

movieSchema.index({ scriptId: 1 });
movieSchema.index({ status: 1 });

export default mongoose.model('Movie', movieSchema);
