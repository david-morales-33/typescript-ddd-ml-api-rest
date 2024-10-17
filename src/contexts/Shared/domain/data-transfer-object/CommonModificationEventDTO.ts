
export class CommonModificationEventDTO {
    private _className: string = 'ModificationEvent.commonDTO';

    constructor(
        readonly id: string,
        readonly createBy: string,
        readonly createDate: Date,
        readonly description: string,
        readonly modifiedField: string,
        readonly previusValue: string,
        readonly newValue: string
    ) { }

    public get className(): string {
        return this._className;
    }
}