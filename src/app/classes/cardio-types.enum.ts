export enum CardioTypes {
    RUNNING = 1,
    WALK,
    STEPPER,
    ELLIPSE,
    BICYCLE,
    WORKOUT
}

export const CardioTypesHB = [
    {sysname: CardioTypes.RUNNING, name: 'Бег'},
    {sysname: CardioTypes.WALK, name: 'Ходьба'},
    {sysname: CardioTypes.STEPPER, name: 'STEPPER'},
    {sysname: CardioTypes.ELLIPSE, name: 'ELLIPSE'},
    {sysname: CardioTypes.BICYCLE, name: 'BICYCLE'},
    {sysname: CardioTypes.WORKOUT, name: 'Свободный вес'}
];