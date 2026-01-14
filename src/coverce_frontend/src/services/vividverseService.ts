// Auto-switch between mock and real service
// Set VITE_USE_MOCK_SERVICE=false to use real API

// Default to real API - for mock mode, import directly from vividverseService.mock
import { scriptAPI, validationAPI, movieAPI } from './apiService';

// Map to match the expected interface
export const submitScript = async (
  title: string,
  format: 'PDF' | 'Fountain' | 'Text',
  content: Uint8Array,
  summary?: string
) => {
  // Convert Uint8Array to File
  const blob = new Blob([content]);
  const file = new File([blob], `script.${format.toLowerCase()}`, { type: 'application/octet-stream' });
  const result = await scriptAPI.submitScript(title, format, file, summary);
  return result.script.id;
};

export const getScript = async (scriptId: number) => {
  return await scriptAPI.getScript(scriptId.toString());
};

export const getPendingScripts = async () => {
  return await scriptAPI.getPendingScripts();
};

export const getAllScripts = async () => {
  return await scriptAPI.getAllScripts();
};

export const registerValidator = async () => {
  const result = await validationAPI.registerValidator();
  return { ok: result.isValidator };
};

export const isValidator = async (userId: string) => {
  return await validationAPI.isValidator();
};

export const submitValidation = async (
  scriptId: number,
  scores: Array<{ category: string; score: number }>,
  comments?: string
) => {
  // Convert category format
  const scoreObj: Record<string, number> = {};
  scores.forEach(s => {
    const key = s.category === 'Story' ? 'story' :
                s.category === 'Characters' ? 'characters' :
                s.category === 'Dialogue' ? 'dialogue' :
                s.category === 'Originality' ? 'originality' :
                s.category === 'Structure' ? 'structure' : 'visualPotential';
    scoreObj[key] = s.score;
  });
  
  const result = await validationAPI.submitValidation(scriptId.toString(), scoreObj, comments);
  return { ok: true };
};

export const getValidations = async (scriptId: number) => {
  return await validationAPI.getValidations(scriptId.toString());
};

export const getAggregatedScore = async (scriptId: number) => {
  return await movieAPI.getAggregatedScore(scriptId.toString());
};

export const getTopScript = async () => {
  const result = await scriptAPI.getTopScript();
  return result.script;
};

export const startMovieGeneration = async (scriptId: number) => {
  const result = await movieAPI.startMovieGeneration(scriptId.toString());
  return { ok: true };
};

export const getMovie = async (scriptId: number) => {
  return await movieAPI.getMovie(scriptId.toString());
};
