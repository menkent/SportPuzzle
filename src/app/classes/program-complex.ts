import { ProtoTraining } from './proto-training';
import { Mappable } from './mappable';

export class ProgramComplex extends Mappable {
    private _id: string;
    private _name: string;
    private _protoTrainigs: ProtoTraining[] = []; 

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    
    public get protoTrainigs(): ProtoTraining[] {
        return this._protoTrainigs;
    }
    public set protoTrainigs(value: ProtoTraining[]) {
        this._protoTrainigs = value;
    }
}
