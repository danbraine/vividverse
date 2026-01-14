import mongoose from 'mongoose';

const scriptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  format: {
    type: String,
    enum: ['PDF', 'Fountain', 'Text'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true, // URL to file in cloud storage
  },
  fileHash: {
    type: String,
    required: true, // Content hash for integrity
  },
  summary: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['PendingValidation', 'Validating', 'Selected', 'Generating', 'Completed', 'Rejected'],
    default: 'PendingValidation',
  },
  content: {
    type: String, // Store text content if available
  },
}, {
  timestamps: true,
});

// Index for faster queries
scriptSchema.index({ status: 1, createdAt: -1 });
scriptSchema.index({ author: 1 });

export default mongoose.model('Script', scriptSchema);
