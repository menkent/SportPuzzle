import { Exercise } from './exercise';
import { Mappable } from './mappable';
import { CardioInfo } from './cardio-info';
import { ProtoTraining } from './proto-training';

export class Training extends Mappable {
    private _protoTrainig: ProtoTraining;
    private _exercises: Exercise[] = [];
    private _date: string;
    private _userWeight: number;
    private _cardioStart: CardioInfo;
    private _cardioEnd: CardioInfo;

    public get protoTrainig(): ProtoTraining {
        return this._protoTrainig;
    }
    public set protoTrainig(value: ProtoTraining) {
        this._protoTrainig = value;
    }

    public get exercises(): Exercise[] {
        return this._exercises;
    }
    public set exercises(value: Exercise[]) {
        this._exercises = value;
    }

    public get date(): string {
        return this._date;
    }
    public set date(value: string) {
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

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);
        }
    }


}
