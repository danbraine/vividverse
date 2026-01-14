import Validation from '../models/Validation.js';
import User from '../models/User.js';
import Script from '../models/Script.js';
import { calculateAggregatedScore } from '../services/scoreAggregation.js';

export const registerValidator = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.isValidator) {
      return res.json({ message: 'Already registered as validator', isValidator: true });
    }

    user.isValidator = true;
    user.role = 'validator';
    await user.save();

    res.json({ message: 'Successfully registered as validator', isValidator: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register as validator' });
  }
};

export const isValidator = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ isValidator: user.isValidator || false });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check validator status' });
  }
};

export const submitValidation = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const { scores, comments } = req.body;

    if (!scores || typeof scores !== 'object') {
      return res.status(400).json({ error: 'Scores are required' });
    }

    // Validate scores
    const requiredCategories = ['story', 'characters', 'dialogue', 'originality', 'structure', 'visualPotential'];
    for (const category of requiredCategories) {
      if (typeof scores[category] !== 'number' || scores[category] < 0 || scores[category] > 10) {
        return res.status(400).json({ error: `Invalid score for ${category}` });
      }
    }

    // Check if script exists
    const script = await Script.findById(scriptId);
    if (!script) {
      return res.status(404).json({ error: 'Script not found' });
    }

    // Check if already validated
    const existingValidation = await Validation.findOne({
      scriptId,
      validatorId: req.user._id,
    });

    if (existingValidation) {
      return res.status(400).json({ error: 'Already validated this script' });
    }

    // Create validation
    const validation = new Validation({
      scriptId,
      validatorId: req.user._id,
      scores,
      comments: comments || '',
    });

    await validation.save();

    // Update script status if needed
    if (script.status === 'PendingValidation') {
      script.status = 'Validating';
      await script.save();
    }

    // Calculate aggregated score
    await calculateAggregatedScore(scriptId);

    res.status(201).json({
      validation: {
        id: validation._id,
        scriptId: validation.scriptId,
        scores: validation.scores,
        comments: validation.comments,
        createdAt: validation.createdAt,
      },
    });
  } catch (error) {
    console.error('Validation submission error:', error);
    res.status(500).json({ error: 'Failed to submit validation' });
  }
};

export const getValidations = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const validations = await Validation.find({ scriptId })
      .populate('validatorId', 'email name')
      .sort({ createdAt: -1 });

    res.json({ validations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get validations' });
  }
};
