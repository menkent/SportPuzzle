import { ProtoExercise } from './proto-exercise';
import { MyTry } from './my-try';
import { Mappable } from './mappable';

export class Exercise extends Mappable {
    private _protoLink: ProtoExercise;
    private _tryes: MyTry[] = [];
    private _comment: string;

    public get protoLink(): ProtoExercise {
        return this._protoLink;
    }
    public set protoLink(value: ProtoExercise) {
        this._protoLink = value;
    }

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
    set name(value: any) {}

    get description() { return this.protoLink.description; }
    set description(value: any) {}

    get isCompleted() { return this.tryes.length > 0;} // Упражнение считается выполненным, если есть хоть 1 подход
    set isCompleted(value: any) {}

    haveNotEmprtyTryes() {
        let notEmpty = false;
        this.tryes.map((el: MyTry) => notEmpty = notEmpty || !el.isEmpty());
        return notEmpty;
    }

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);

            if (data['protoLink']) {
                this.protoLink = new ProtoExercise(data['protoLink']);
            }

            if (data['tryes']) {
                this.tryes = data['tryes'].map(el => new MyTry(el));
            }
        }
    }

    public toMap(obj: any = this): any {
        const m = super.toMap(obj);
        delete m['name'];
        delete m['description'];
        delete m['isCompleted'];
        return m;
      }
}
