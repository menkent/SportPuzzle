import { ProgramComplex } from '../classes/program-complex';
import { ProtoTraining } from '../classes/proto-training';
import { ProtoExercise } from '../classes/proto-exercise';
import { User } from '../classes/user';
import { protoExercisesAndrewDay1, protoExercisesAndrewDay2, protoExercisesAndrewDay3 } from './proto-exercises-andrew';
import { protoExercisesVikaDay1, protoExercisesVikaDay2, protoExercisesVikaDay3 } from './proto-exercises-vika';






const TestProtoTrainigVika1 = new ProtoTraining({
    name: 'ДЕНЬ 1: ноги, спина(широчайшие), бицепс',
    id: '1',
    exercises: protoExercisesVikaDay1,
});

const TestProtoTrainigVika2 = new ProtoTraining({
    name: 'ДЕНЬ 2: грудь, орешек, трицепс',
    id: '2',
    exercises: protoExercisesVikaDay2,
});

const TestProtoTrainigVika3 = new ProtoTraining({
    name: 'ДЕНЬ 3: ноги, плечи(дельты), руки',
    id: '1',
    exercises: protoExercisesVikaDay3,
});

const TestProtoTrainigA1 = new ProtoTraining({
    name: 'ДЕНЬ 1: ноги, спина(широчайшие), бицепс',
    id: 'a1',
    exercises: protoExercisesAndrewDay1,
});

const TestProtoTrainigA2 = new ProtoTraining({
    name: 'ДЕНЬ 2: грудь, плечи+спина, трицепс',
    id: 'a2',
    exercises: protoExercisesAndrewDay2,
});

const TestProtoTrainigA3 = new ProtoTraining({
    name: 'ДЕНЬ 3: ноги, плечи(дельты), руки',
    id: 'a3',
    exercises: protoExercisesAndrewDay3,
});


export const PROGCOMPLEX1 = new ProgramComplex({
    id: 'adad13213',
    name: 'Первый ОФП комплекс (женский)',
    protoTrainigs: [TestProtoTrainigVika1, TestProtoTrainigVika2, TestProtoTrainigVika3],
});

export const PROGCOMPLEX2 = new ProgramComplex({
    id: 'aasdadasdad123213',
    name: 'Первый ОФП комплекс',
    protoTrainigs: [TestProtoTrainigA1, TestProtoTrainigA2, TestProtoTrainigA3],
});


export const USER_LIST = [
    new User({
        id: 'vika',
        programComplexes: [PROGCOMPLEX1],
    }),
    new User({
        id: 'andrew',
        programComplexes: [PROGCOMPLEX2],
    }),
    new User({
        id: 'test',
        programComplexes: [PROGCOMPLEX1, PROGCOMPLEX2],
    }),
    new User({
        id: 'Test',
        programComplexes: [PROGCOMPLEX1, PROGCOMPLEX2],
    }),
];
