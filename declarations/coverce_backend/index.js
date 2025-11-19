export const idlFactory = ({ IDL }) => {
  const ScriptFormat = IDL.Variant({
    'PDF': IDL.Null,
    'Fountain': IDL.Null,
    'Text': IDL.Null,
  });
  const ScriptStatus = IDL.Variant({
    'PendingValidation': IDL.Null,
    'Validating': IDL.Null,
    'Validated': IDL.Null,
    'Selected': IDL.Null,
    'Generating': IDL.Null,
    'Completed': IDL.Null,
    'Rejected': IDL.Null,
  });
  const ScriptSubmission = IDL.Record({
    'id': IDL.Nat,
    'title': IDL.Text,
    'author': IDL.Principal,
    'format': ScriptFormat,
    'contentHash': IDL.Text,
    'uploadedAt': IDL.Int,
    'status': ScriptStatus,
    'summary': IDL.Opt(IDL.Text),
  });
  const Category = IDL.Variant({
    'Story': IDL.Null,
    'Characters': IDL.Null,
    'Dialogue': IDL.Null,
    'Originality': IDL.Null,
    'Structure': IDL.Null,
    'VisualPotential': IDL.Null,
  });
  const ValidationScore = IDL.Record({
    'validatorId': IDL.Principal,
    'scriptId': IDL.Nat,
    'scores': IDL.Vec(IDL.Tuple(Category, IDL.Nat)),
    'comments': IDL.Opt(IDL.Text),
    'timestamp': IDL.Int,
  });
  const AggregatedScore = IDL.Record({
    'scriptId': IDL.Nat,
    'categoryScores': IDL.Vec(IDL.Tuple(Category, IDL.Float64)),
    'totalScore': IDL.Float64,
    'validatorCount': IDL.Nat,
  });
  const SceneStatus = IDL.Variant({
    'Pending': IDL.Null,
    'Generating': IDL.Null,
    'Completed': IDL.Null,
    'Failed': IDL.Null,
  });
  const Scene = IDL.Record({
    'id': IDL.Nat,
    'scriptId': IDL.Nat,
    'sceneNumber': IDL.Nat,
    'description': IDL.Text,
    'prompt': IDL.Text,
    'status': SceneStatus,
  });
  const MovieStatus = IDL.Variant({
    'Generating': IDL.Null,
    'Completed': IDL.Null,
    'Failed': IDL.Null,
  });
  const Movie = IDL.Record({
    'scriptId': IDL.Nat,
    'movieHash': IDL.Text,
    'thumbnailHash': IDL.Opt(IDL.Text),
    'duration': IDL.Opt(IDL.Nat),
    'status': MovieStatus,
    'createdAt': IDL.Int,
  });
  const Error = IDL.Variant({
    'NotFound': IDL.Null,
    'Unauthorized': IDL.Null,
    'InvalidInput': IDL.Null,
    'StorageFull': IDL.Null,
    'ProcessingFailed': IDL.Null,
  });
  const Result = IDL.Variant({
    'ok': IDL.Nat,
    'err': Error,
  });
  const Result_1 = IDL.Variant({
    'ok': ScriptSubmission,
    'err': Error,
  });
  const Result_2 = IDL.Variant({
    'ok': IDL.Vec(IDL.Nat8),
    'err': Error,
  });
  const Result_3 = IDL.Variant({
    'ok': IDL.Bool,
    'err': Error,
  });
  const Result_4 = IDL.Variant({
    'ok': AggregatedScore,
    'err': Error,
  });
  return IDL.Service({
    'getAggregatedScore': IDL.Func([IDL.Nat], [Result_4], ['query']),
    'getAllScripts': IDL.Func([], [IDL.Vec(ScriptSubmission)], ['query']),
    'getMovie': IDL.Func([IDL.Nat], [Result_1], ['query']),
    'getPendingScripts': IDL.Func([], [IDL.Vec(ScriptSubmission)], ['query']),
    'getScript': IDL.Func([IDL.Nat], [Result_1], ['query']),
    'getScriptContent': IDL.Func([IDL.Nat], [Result_2], ['query']),
    'getTopScript': IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
    'getValidations': IDL.Func([IDL.Nat], [IDL.Vec(ValidationScore)], ['query']),
    'isValidator': IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'registerValidator': IDL.Func([], [IDL.Bool], []),
    'selectTopScript': IDL.Func([], [Result], []),
    'startMovieGeneration': IDL.Func([IDL.Nat], [Result_3], []),
    'submitScript': IDL.Func([IDL.Text, ScriptFormat, IDL.Vec(IDL.Nat8), IDL.Opt(IDL.Text)], [Result], []),
    'submitValidation': IDL.Func([IDL.Nat, IDL.Vec(IDL.Tuple(Category, IDL.Nat)), IDL.Opt(IDL.Text)], [Result_3], []),
    'updateMovieProgress': IDL.Func([IDL.Nat, IDL.Text, IDL.Opt(IDL.Text), IDL.Opt(IDL.Nat)], [Result_3], []),
  });
};
export const init = ({ IDL }) => { return []; };
