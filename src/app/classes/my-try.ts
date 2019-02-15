import { MyTryTypes } from './my-try-types.enum';
import { Mappable } from './mappable';

export class MyTry extends Mappable {
    private _type: MyTryTypes = MyTryTypes.POWER;
    private _weight: number;
    private _repeatCount: number;
    private _index: number;

    public get type(): MyTryTypes {
        return this._type;
    }
    public set type(value: MyTryTypes) {
        this._type = value;
    }

    public get weight(): number {
        return this._weight;
    }
    public set weight(value: number) {
        this._weight = value;
    }

    public get repeatCount(): number {
        return this._repeatCount;
    }
    public set repeatCount(value: number) {
        this._repeatCount = value;
    }

    public get index(): number {
        return this._index;
    }
    public set index(value: number) {
        this._index = value;
    }

    isEmpty() {
        return !this._repeatCount || this._repeatCount <= 0;
    }

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);
        }
    }
}
