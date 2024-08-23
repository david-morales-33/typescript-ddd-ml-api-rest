export class CommonUserDTO {
    private _className: string = 'User.commonDTO';

    constructor(
        readonly id: string,
        readonly name: string,
        readonly profileId: number,
        readonly profileName: string,
        readonly description: string,
        readonly modificationEventList: any[]
    ) { }

    public get className(): string {
        return this._className;
    }
}