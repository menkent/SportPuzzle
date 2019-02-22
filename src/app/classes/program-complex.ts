import { ProtoTraining } from './proto-training';
import { Mappable } from './mappable';

export class ProgramComplex extends Mappable {
    private _id: string;
    private _name: string;
    private _protoTrainings: ProtoTraining[] = [];
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

    public get protoTrainings(): ProtoTraining[] {
        return this._protoTrainings;
    }
    public set protoTrainings(value: ProtoTraining[]) {
        this._protoTrainings = value;
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

            // todo: стереть потом, так как сохранение работает через protoTrainings
            if (data['protoTrainigs']) {
                this.protoTrainings = data['protoTrainigs'].map(el => new ProtoTraining(el));
            }

            if (data['protoTrainings']) {
                this.protoTrainings = data['protoTrainings'].map(el => new ProtoTraining(el));
            }
        }
    }
}
