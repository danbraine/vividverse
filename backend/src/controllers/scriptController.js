import Script from '../models/Script.js';
import { generateFileHash, uploadToCloudStorage } from '../services/fileUpload.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const submitScript = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, format, summary } = req.body;
    const file = req.file;

    if (!title || !format) {
      return res.status(400).json({ error: 'Title and format are required' });
    }

    // Read file and generate hash
    const fileBuffer = await fs.readFile(file.path);
    const fileHash = generateFileHash(fileBuffer);

    // Upload to cloud storage (for now, use local path)
    const fileUrl = await uploadToCloudStorage(file.path, file.filename);

    // Determine format from file extension if not provided
    let scriptFormat = format;
    if (!scriptFormat) {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext === '.pdf') scriptFormat = 'PDF';
      else if (ext === '.fountain') scriptFormat = 'Fountain';
      else scriptFormat = 'Text';
    }

    // Extract text content if it's a text file
    let content = null;
    if (scriptFormat === 'Text' || scriptFormat === 'Fountain') {
      content = fileBuffer.toString('utf-8');
    }

    // Create script
    const script = new Script({
      title,
      author: req.user._id,
      format: scriptFormat,
      fileUrl,
      fileHash,
      summary: summary || '',
      content,
      status: 'PendingValidation',
    });

    await script.save();
    await script.populate('author', 'email name');

    res.status(201).json({
      script: {
        id: script._id,
        title: script.title,
        author: script.author,
        format: script.format,
        status: script.status,
        summary: script.summary,
        createdAt: script.createdAt,
      },
    });
  } catch (error) {
    console.error('Script submission error:', error);
    res.status(500).json({ error: 'Failed to submit script' });
  }
};

export const getScript = async (req, res) => {
  try {
    const script = await Script.findById(req.params.id).populate('author', 'email name');
    if (!script) {
      return res.status(404).json({ error: 'Script not found' });
    }
    res.json({ script });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get script' });
  }
};

export const getPendingScripts = async (req, res) => {
  try {
    const scripts = await Script.find({
      status: { $in: ['PendingValidation', 'Validating'] },
    })
      .populate('author', 'email name')
      .sort({ createdAt: -1 });

    res.json({ scripts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pending scripts' });
  }
};

export const getAllScripts = async (req, res) => {
  try {
    const scripts = await Script.find()
      .populate('author', 'email name')
      .sort({ createdAt: -1 });

    res.json({ scripts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get scripts' });
  }
};

export const getTopScript = async (req, res) => {
  try {
    const AggregatedScore = (await import('../models/AggregatedScore.js')).default;
    
    // Find script with highest average score
    const topScore = await AggregatedScore.findOne()
      .sort({ 'averageScores.visualPotential': -1, totalValidations: -1 })
      .populate('scriptId');

    if (!topScore || !topScore.scriptId) {
      return res.status(404).json({ error: 'No top script found' });
    }

    const script = await Script.findById(topScore.scriptId).populate('author', 'email name');
    res.json({ script, score: topScore });
  } catch (error) {
    console.error('Get top script error:', error);
    res.status(500).json({ error: 'Failed to get top script' });
  }
};
