import Movie from '../models/Movie.js';
import Script from '../models/Script.js';
import AggregatedScore from '../models/AggregatedScore.js';

export const startMovieGeneration = async (req, res) => {
  try {
    const { scriptId } = req.params;

    // Check if script exists
    const script = await Script.findById(scriptId);
    if (!script) {
      return res.status(404).json({ error: 'Script not found' });
    }

    // Check if script has been selected (has validations and good scores)
    const aggregatedScore = await AggregatedScore.findOne({ scriptId });
    if (!aggregatedScore || aggregatedScore.totalValidations < 1) {
      return res.status(400).json({ error: 'Script must be validated before generation' });
    }

    // Update script status
    script.status = 'Selected';
    await script.save();

    // Create or update movie record
    let movie = await Movie.findOne({ scriptId });
    if (!movie) {
      movie = new Movie({
        scriptId,
        status: 'Pending',
        progress: 0,
      });
    } else {
      movie.status = 'Pending';
      movie.progress = 0;
      movie.error = null;
    }

    await movie.save();

    // TODO: Trigger AI orchestrator here
    // For now, just return success
    // In production, you'd call the orchestrator service or add to a queue

    res.json({
      message: 'Movie generation started',
      movie: {
        id: movie._id,
        scriptId: movie.scriptId,
        status: movie.status,
        progress: movie.progress,
      },
    });
  } catch (error) {
    console.error('Start movie generation error:', error);
    res.status(500).json({ error: 'Failed to start movie generation' });
  }
};

export const getMovie = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const movie = await Movie.findOne({ scriptId }).populate('scriptId');

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json({ movie });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get movie' });
  }
};

export const updateMovieProgress = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { status, progress, videoUrl, thumbnailUrl, duration, error } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    if (status) movie.status = status;
    if (progress !== undefined) movie.progress = progress;
    if (videoUrl) movie.videoUrl = videoUrl;
    if (thumbnailUrl) movie.thumbnailUrl = thumbnailUrl;
    if (duration) movie.duration = duration;
    if (error) movie.error = error;

    await movie.save();

    // Update script status if movie is completed
    if (status === 'Completed') {
      await Script.findByIdAndUpdate(movie.scriptId, { status: 'Completed' });
    }

    res.json({ movie });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update movie progress' });
  }
};

export const getAggregatedScore = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const aggregatedScore = await AggregatedScore.findOne({ scriptId });

    if (!aggregatedScore) {
      return res.status(404).json({ error: 'Score not found' });
    }

    res.json({ score: aggregatedScore });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get aggregated score' });
  }
};
