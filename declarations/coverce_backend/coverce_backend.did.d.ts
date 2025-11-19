import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ScriptFormat = { 'PDF': null } | { 'Fountain': null } | { 'Text': null };
export type ScriptStatus = { 'PendingValidation': null } | { 'Validating': null } | { 'Validated': null } | { 'Selected': null } | { 'Generating': null } | { 'Completed': null } | { 'Rejected': null };
export interface ScriptSubmission {
  'id': bigint;
  'title': string;
  'author': Principal;
  'format': ScriptFormat;
  'contentHash': string;
  'uploadedAt': bigint;
  'status': ScriptStatus;
  'summary': [] | [string];
}
export type Category = { 'Story': null } | { 'Characters': null } | { 'Dialogue': null } | { 'Originality': null } | { 'Structure': null } | { 'VisualPotential': null };
export interface ValidationScore {
  'validatorId': Principal;
  'scriptId': bigint;
  'scores': Array<[Category, bigint]>;
  'comments': [] | [string];
  'timestamp': bigint;
}
export interface AggregatedScore {
  'scriptId': bigint;
  'categoryScores': Array<[Category, number]>;
  'totalScore': number;
  'validatorCount': bigint;
}
export type SceneStatus = { 'Pending': null } | { 'Generating': null } | { 'Completed': null } | { 'Failed': null };
export interface Scene {
  'id': bigint;
  'scriptId': bigint;
  'sceneNumber': bigint;
  'description': string;
  'prompt': string;
  'status': SceneStatus;
}
export type MovieStatus = { 'Generating': null } | { 'Completed': null } | { 'Failed': null };
export interface Movie {
  'scriptId': bigint;
  'movieHash': string;
  'thumbnailHash': [] | [string];
  'duration': [] | [bigint];
  'status': MovieStatus;
  'createdAt': bigint;
}
export type Error = { 'NotFound': null } | { 'Unauthorized': null } | { 'InvalidInput': null } | { 'StorageFull': null } | { 'ProcessingFailed': null };
export type Result = { 'ok': bigint } | { 'err': Error };
export type Result_1 = { 'ok': ScriptSubmission } | { 'err': Error };
export type Result_2 = { 'ok': Uint8Array | number[] } | { 'err': Error };
export type Result_3 = { 'ok': boolean } | { 'err': Error };
export type Result_4 = { 'ok': AggregatedScore } | { 'err': Error };
export interface _SERVICE {
  'getAggregatedScore': ActorMethod<[bigint], Result_4>;
  'getAllScripts': ActorMethod<[], Array<ScriptSubmission>>;
  'getMovie': ActorMethod<[bigint], Result_1>;
  'getPendingScripts': ActorMethod<[], Array<ScriptSubmission>>;
  'getScript': ActorMethod<[bigint], Result_1>;
  'getScriptContent': ActorMethod<[bigint], Result_2>;
  'getTopScript': ActorMethod<[], [] | [bigint]>;
  'getValidations': ActorMethod<[bigint], Array<ValidationScore>>;
  'isValidator': ActorMethod<[Principal], boolean>;
  'registerValidator': ActorMethod<[], boolean>;
  'selectTopScript': ActorMethod<[], Result>;
  'startMovieGeneration': ActorMethod<[bigint], Result_3>;
  'submitScript': ActorMethod<[string, ScriptFormat, Uint8Array | number[], [] | [string]], Result>;
  'submitValidation': ActorMethod<[bigint, Array<[Category, bigint]>, [] | [string]], Result_3>;
  'updateMovieProgress': ActorMethod<[bigint, string, [] | [string], [] | [bigint]], Result_3>;
}

