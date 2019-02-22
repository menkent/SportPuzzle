import { protoExercisesAndrewDay1, protoExercisesAndrewDay3, protoExercisesAndrewDay2 } from './proto-exercises-andrew';
import { PROTO_EXERCISE_V2_PARTH } from './exercises_conts';

export const protoExercisesVikaDay1 = [
    ...protoExercisesAndrewDay1
];

export const protoExercisesVikaDay2 = [
    protoExercisesAndrewDay2[0],
    protoExercisesAndrewDay2[1],
    protoExercisesAndrewDay2[2],
    ...PROTO_EXERCISE_V2_PARTH,
    protoExercisesAndrewDay2[6],
];

export const protoExercisesVikaDay3 = [
    ...protoExercisesAndrewDay3
];