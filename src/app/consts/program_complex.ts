import { ProgramComplex } from '../classes/program-complex';
import { ProtoTraining } from '../classes/proto-training';
import { ProtoExercise } from '../classes/proto-exercise';



const protoExercises = [
    new ProtoExercise({
        name: 'Жим ногами платформы лёжа',
        description: 'жим ногами платформы лёжа на спине',
        videoLink: '',
    }),
    new ProtoExercise({
        name: 'Жим штанги от груди на горизонтальной скамье',
        description: 'Жим штанги от груди на горизонтальной скамье',
        videoLink: '',
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
]


const TestProtoTrainig = new ProtoTraining({
    name: 'test proto training 1',
    id: '1',
    exercises: [protoExercises],
});


export const PROGCOMPLEX = new ProgramComplex({
    id: 'tasdtatdajhb',
    name: 'test 1',
    protoTrainigs: [TestProtoTrainig],
});