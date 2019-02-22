import { Exercise } from './exercise';
import { Mappable } from './mappable';
import { CardioInfo } from './cardio-info';
import { ProtoTraining } from './proto-training';
import { ProtoExercise } from './proto-exercise';

export class Training extends Mappable {
    private _id: string;
    private _protoTrainig: ProtoTraining;
    private _exercises: Exercise[] = [];
    private _date: number;
    private _userWeight: number;
    private _cardioStart: CardioInfo;
    private _cardioEnd: CardioInfo;
    private _comment: string;
    private _isCompleted: boolean = false; // Определет, что тренировка завершена, значит её можно использовать для анализа

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get protoTrainig(): ProtoTraining {
        return this._protoTrainig;
    }
    public set protoTrainig(value: ProtoTraining) {
        this._protoTrainig = value;
    }

    public get protoTraining(): ProtoTraining {
        return this._protoTrainig;
    }
    public set protoTraining(value: ProtoTraining) {
        this._protoTrainig = value;
    }

    public get exercises(): Exercise[] {
        return this._exercises;
    }
    public set exercises(value: Exercise[]) {
        this._exercises = value;
    }

    public get date(): number {
        return this._date;
    }
    public set date(value: number) {
        this._date = value;
    }

    public get userWeight(): number {
        return this._userWeight;
    }
    public set userWeight(value: number) {
        this._userWeight = value;
    }

    public get cardioStart(): CardioInfo {
        return this._cardioStart;
    }
    public set cardioStart(value: CardioInfo) {
        this._cardioStart = value;
    }

    public get cardioEnd(): CardioInfo {
        return this._cardioEnd;
    }
    public set cardioEnd(value: CardioInfo) {
        this._cardioEnd = value;
    }

    public get comment(): string {
        return this._comment;
    }
    public set comment(value: string) {
        this._comment = value;
    }

    public get isCompleted(): boolean {
        return this._isCompleted;
    }
    public set isCompleted(value: boolean) {
        this._isCompleted = value;
    }

    get canComplete() {
        // Нужно, чтобы были выполнены все упражнения
        if (this.protoTrainig.exercises.length === this.exercises.length) {
            for(let i = 0; i < this.exercises.length; i++) {
                if (!this.exercises[i].isCompleted) {
                    return false;
                }
            }
        }
        // Минимум 1 кардио
        if (!(this.cardioEnd.isCompleted || this.cardioStart.isCompleted)) {
            return false;
        }

        return true;
    }

    set canComplete(value: any) {}

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);

            if (data['cardioStart']) {
                this.cardioStart = new CardioInfo(data['cardioStart']);
            }
            if (data['cardioEnd']) {
                this.cardioEnd = new CardioInfo(data['cardioEnd']);
            }

            if (data['exercises']) {
                this.exercises = data['exercises'].map(el => new Exercise(el));
            }
        }
    }

    init() {
        this.cardioStart = new CardioInfo();
        this.cardioEnd = new CardioInfo();
        this.exercises = this.protoTrainig.exercises.map((exer: ProtoExercise) => new Exercise({protoLink: exer}));
    }

    getExercise(protoExercise) {
        return this.exercises.find(ex => ex.protoLink.id === protoExercise.id);
    }

    getExercises(protoExercise) {
        return this.exercises.filter(ex => ex.protoLink.id === protoExercise.id);
    }

    // public toMap(obj: any = this): any {
    // }


}
