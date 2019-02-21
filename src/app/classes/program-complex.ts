import { ProtoTraining } from './proto-training';
import { Mappable } from './mappable';

export class ProgramComplex extends Mappable {
    private _id: string;
    private _name: string;
    private _protoTrainigs: ProtoTraining[] = [];
    private _comment: string;

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

    public get comment(): string {
        return this._comment;
    }
    public set comment(value: string) {
        this._comment = value;
    }

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);

            if (data['protoTrainigs']) {
                this.protoTrainigs = data['protoTrainigs'].map(el => new ProtoTraining(el));
            }
        }
    }
}
