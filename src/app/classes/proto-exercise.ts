import { Mappable } from './mappable';

export class ProtoExercise extends Mappable {
    private _id: string;
    private _name: string;
    private _description: string;
    private _videoLink: string;
    private _basic: boolean = true;

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

    public get basic(): boolean {
        return this._basic;
    }
    public set basic(value: boolean) {
        this._basic = value;
    }

    isEmpty() {
        return !this.id || !this.name;
    }

    constructor(data?: any) {
        super(data);
        if (data) {
            Object.assign(this, data);
        }
    }
}
