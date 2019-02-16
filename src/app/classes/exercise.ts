import { ProtoExercise } from './proto-exercise';
import { MyTry } from './my-try';
import { Mappable } from './mappable';

export class Exercise extends Mappable {
    protoLink: ProtoExercise;
    private _tryes: MyTry[] = [];
    private _comment: string;

    public get tryes(): MyTry[] {
        return this._tryes;
    }
    public set tryes(value: MyTry[]) {
        this._tryes = value;
    }

    public get comment(): string {
        return this._comment;
    }
    public set comment(value: string) {
        this._comment = value;
    }

    get name() { return this.protoLink.name; }
    get description() { return this.protoLink.description; }
    get isCompleted() { return this.tryes.length > 0;} // Упражнение считается выполненным, если есть хоть 1 подход

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);
        }
    }
}
