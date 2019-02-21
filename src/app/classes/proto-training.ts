import { ProtoExercise } from './proto-exercise';
import { Mappable } from './mappable';

export class ProtoTraining extends Mappable {
    private _name: string;
    private _id: string;
    private _exercises: ProtoExercise[] = [];

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get exercises(): ProtoExercise[] {
        return this._exercises;
    }
    public set exercises(value: ProtoExercise[]) {
        this._exercises = value;
    }

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);

            if (data['exercises']) {
                this.exercises = data['exercises'].map(el => new ProtoExercise(el));
            }
        }
    }
}
