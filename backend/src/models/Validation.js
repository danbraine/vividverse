import mongoose from 'mongoose';

const validationSchema = new mongoose.Schema({
  scriptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Script',
    required: true,
  },
  validatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scores: {
    story: { type: Number, min: 0, max: 10, required: true },
    characters: { type: Number, min: 0, max: 10, required: true },
    dialogue: { type: Number, min: 0, max: 10, required: true },
    originality: { type: Number, min: 0, max: 10, required: true },
    structure: { type: Number, min: 0, max: 10, required: true },
    visualPotential: { type: Number, min: 0, max: 10, required: true },
  },
  comments: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Prevent duplicate validations
validationSchema.index({ scriptId: 1, validatorId: 1 }, { unique: true });

export default mongoose.model('Validation', validationSchema);
