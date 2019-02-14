import { Mappable } from './mappable';

export class ProtoExercise extends Mappable {
    private _name: string;
    private _description: string;
    private _videoLink: string;

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get videoLink(): string {
        return this._videoLink;
    }
    public set videoLink(value: string) {
        this._videoLink = value;
    }

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);
        }
    }
}
