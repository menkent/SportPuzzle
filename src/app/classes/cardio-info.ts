import { Mappable } from './mappable';
import { CardioTypes, CardioTypesHB } from './cardio-types.enum';

export class CardioInfo extends Mappable {
    private _cardioType: CardioTypes = CardioTypes.RUNNING;
    private _averagePulse: number;
    private _averageSpeed: number;
    private _time: number = 0; // in seconds

    public get cardioType(): CardioTypes {
        return this._cardioType;
    }
    public set cardioType(value: CardioTypes) {
        this._cardioType = value;
    }

    public get averagePulse(): number {
        return this._averagePulse;
    }
    public set averagePulse(value: number) {
        this._averagePulse = value;
    }

    public get averageSpeed(): number {
        return this._averageSpeed;
    }
    public set averageSpeed(value: number) {
        this._averageSpeed = value;
    }

    public get time(): number {
        return this._time;
    }
    public set time(value: number) {
        this._time = value;
    }

    get isCompleted() {
        return this.time;
    }
    set isCompleted(value: any) {}

    get typeName() {
        const finded = CardioTypesHB.find( ({sysname}) => sysname === this.cardioType);
        return finded && finded.name || '';
    }
    set typeName(value) {}

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);
        }
    }
}
