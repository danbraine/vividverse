import AggregatedScore from '../models/AggregatedScore.js';
import Validation from '../models/Validation.js';

export const calculateAggregatedScore = async (scriptId) => {
  try {
    // Get all validations for this script
    const validations = await Validation.find({ scriptId });

    if (validations.length === 0) {
      return null;
    }

    // Calculate averages
    const totals = {
      story: 0,
      characters: 0,
      dialogue: 0,
      originality: 0,
      structure: 0,
      visualPotential: 0,
    };

    validations.forEach((validation) => {
      totals.story += validation.scores.story;
      totals.characters += validation.scores.characters;
      totals.dialogue += validation.scores.dialogue;
      totals.originality += validation.scores.originality;
      totals.structure += validation.scores.structure;
      totals.visualPotential += validation.scores.visualPotential;
    });

    const count = validations.length;
    const averages = {
      story: totals.story / count,
      characters: totals.characters / count,
      dialogue: totals.dialogue / count,
      originality: totals.originality / count,
      structure: totals.structure / count,
      visualPotential: totals.visualPotential / count,
    };

    // Update or create aggregated score
    const aggregatedScore = await AggregatedScore.findOneAndUpdate(
      { scriptId },
      {
        averageScores: averages,
        totalValidations: count,
        lastUpdated: new Date(),
      },
      { upsert: true, new: true }
    );

    return aggregatedScore;
  } catch (error) {
    console.error('Error calculating aggregated score:', error);
    throw error;
  }
};
