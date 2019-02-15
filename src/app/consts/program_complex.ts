import { ProgramComplex } from '../classes/program-complex';
import { ProtoTraining } from '../classes/proto-training';
import { ProtoExercise } from '../classes/proto-exercise';



const protoExercises = [
    new ProtoExercise({
        name: 'Жим ногами платформы лёжа',
        description: 'жим ногами платформы лёжа на спине',
        videoLink: 'adasdasd',
    }),
    new ProtoExercise({
        name: 'Жим штанги от груди на горизонтальной скамье',
        description: 'Жим штанги от груди на горизонтальной скамье',
        videoLink: 'asdadasdasd',
    }),
    new ProtoExercise({
        name: 'Становая тяга на прямых ногах (мёртвая тяга)',
        description: 'ну короче тащи снизу вверху, сдирая колени',
        videoLink: '',
    }),
    new ProtoExercise({
        name: 'Тяга горизонтального блока к поясу (гребля)',
        description: 'ну короче тащи на себя с прямой спиной',
        videoLink: '',
    }),
    new ProtoExercise({
        name: 'Французский жим',
        description: 'фвфв',
        videoLink: '',
    }),
    new ProtoExercise({
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
