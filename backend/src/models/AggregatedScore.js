import mongoose from 'mongoose';

const aggregatedScoreSchema = new mongoose.Schema({
  scriptId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Script',
    required: true,
    unique: true,
  },
  averageScores: {
    story: { type: Number, default: 0 },
    characters: { type: Number, default: 0 },
    dialogue: { type: Number, default: 0 },
    originality: { type: Number, default: 0 },
    structure: { type: Number, default: 0 },
    visualPotential: { type: Number, default: 0 },
  },
  totalValidations: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

aggregatedScoreSchema.index({ scriptId: 1 });

export default mongoose.model('AggregatedScore', aggregatedScoreSchema);
