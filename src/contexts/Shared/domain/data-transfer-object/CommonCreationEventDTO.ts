
export class CommonCreationEventDTO {
    
    private _className: string = 'CreationEvent.commonDTO';

    constructor(
        readonly id: string,
        readonly createBy: string,
        readonly createDate: Date,
        readonly description: string
    ) { }

    public get className(): string {
        return this._className;
    }
}