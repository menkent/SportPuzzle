import { MyTryTypes } from './my-try-types.enum';
import { Mappable } from './mappable';

export class MyTry extends Mappable {
    private _type: MyTryTypes = MyTryTypes.POWER;
    private _weight: number = 0;
    private _repeatCount: number = 0;

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
}
