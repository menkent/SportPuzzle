import { ProgramComplex } from '../classes/program-complex';
import { ProtoTraining } from '../classes/proto-training';
import { ProtoExercise } from '../classes/proto-exercise';
import { User } from '../classes/user';



const protoExercises = [
    new ProtoExercise({
        id: '111',
        name: 'Жим ногами платформы лёжа',
        description: 'жим ногами платформы лёжа на спине',
        videoLink: 'https://youtu.be/B_9Vh-GiAcQ',
    }),
    new ProtoExercise({
        id: '222',
        name: 'Жим штанги от груди на горизонтальной скамье',
        description: 'Жим штанги от груди на горизонтальной скамье',
        videoLink: '',
    }),
    new ProtoExercise({
        id: '333',
        name: 'Становая тяга на прямых ногах (мёртвая тяга)',
        description: 'ну короче тащи снизу вверху, сдирая колени',
        videoLink: '',
    }),
    new ProtoExercise({
        id: '444',
        name: 'Тяга горизонтального блока к поясу (гребля)',
        description: 'ну короче тащи на себя с прямой спиной',
        videoLink: '',
    }),
    new ProtoExercise({
        id: '555',
        name: 'Французский жим',
        description: 'фвфв',
        videoLink: '',
    }),
    new ProtoExercise({
        id: '666',
        name: 'Разведение рук в тренажёре-бабочке',
        description: 'Локти должны быть развёрнуты',
        videoLink: '',
    }),
];


const TestProtoTrainig = new ProtoTraining({
    name: 'Тренеровка день 1: спина, трицепс',
    id: '1',
    exercises: protoExercises,
});

const TestProtoTrainig2 = new ProtoTraining({
    name: 'Тренеровка день 2: ноги, бицепс',
    id: '2',
    exercises: protoExercises,
});

export const PROGCOMPLEX = new ProgramComplex({
    id: 'tasdtatdajhb',
    name: 'test 1',
    protoTrainigs: [TestProtoTrainig, TestProtoTrainig2],
});


export const USER_LIST = [
    new User({
        id: 'vika',
        programComplexes: [PROGCOMPLEX],
    }),
    new User({
        id: 'andrew',
        programComplexes: [PROGCOMPLEX],
    }),
];