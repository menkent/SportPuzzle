import { ProgramComplex } from './program-complex';
import { Training } from './training';
import { Mappable } from './mappable';

export class User extends Mappable {
    private _id: string;
    private _programComplexes: ProgramComplex[] = [];
    private _trainigs: Training[] = [];

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

    public get trainigs(): Training[] {
        return this._trainigs;
    }
    public set trainigs(value: Training[]) {
        this._trainigs = value;
    }

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);
        }
    }
}
