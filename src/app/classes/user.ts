import { ProgramComplex } from './program-complex';
import { Training } from './training';
import { Mappable } from './mappable';

export class User extends Mappable {
    private _id: string;
    private _programComplexes: ProgramComplex[] = [];
    private _trainings: Training[] = [];

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }

    public get programComplexes(): ProgramComplex[] {
        return this._programComplexes;
    }
    public set programComplexes(value: ProgramComplex[]) {
        this._programComplexes = value;
    }

    public get trainings(): Training[] {
        return this._trainings;
    }
    public set trainings(value: Training[]) {
        this._trainings = value;
    }

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);

            if (data['programComplexes']) {
                this.programComplexes = data['programComplexes'].map(el => new ProgramComplex(el));
            }

            if (data['trainings']) {
                this.trainings = data['trainings'].map(el => new Training(el));
            }
        }
    }
}
