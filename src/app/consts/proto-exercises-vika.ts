import { ProtoExercise } from "../classes/proto-exercise";
import { protoExercisesAndrewDay1, protoExercisesAndrewDay3, protoExercisesAndrewDay2 } from './proto-exercises-andrew';

export const protoExercisesVikaDay1 = [
    ...protoExercisesAndrewDay1
];

export const protoExercisesVikaDay2 = [
    protoExercisesAndrewDay2[0],
    protoExercisesAndrewDay2[1],
    protoExercisesAndrewDay2[2],

    new ProtoExercise({
        id: 'vd2_4',
        name: 'Подъемы на тумбу',
        description: `
        начинаем с небольшого размера 40 см от пола - сначала увеличение высоты тумбы, затем на высокую 70 см - затем уже берем отягощения - а затем уже блин<br>
        голень перпендикулярна тумбе, следи за коленом<br>
        толчок ногой, которая стоит на тумбе<br>
        по возможности вторую ногу оставить на весу<br>
        по 10 на каждую ногу - 3 подхода<br>
        `,
        videoLink: '',
    }),

    new ProtoExercise({
        id: 'vd2_5',
        name: 'Разведение ног в тренажере сидя',
        description: `20 повторов с задержкой на пиковую точку+10 мелкоамплитудных) * 3 подхода`,
        videoLink: '',
    }),
    
    new ProtoExercise({
        id: 'vd2_6',
        name: 'Ягодичный мостик',
        description: `
        по возможности с резинкой<br>
        как восстановишься - надо доввести присед с прожиманием ягодиц в нижней точке
        `,
        videoLink: '',
    }),

    protoExercisesAndrewDay2[6],
];

export const protoExercisesVikaDay3 = [
    ...protoExercisesAndrewDay3
];