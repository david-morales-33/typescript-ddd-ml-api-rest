
export class UserDTO {
    private _className: string = 'User.DTO';

    constructor(
        readonly id: string,
        readonly name: string,
        readonly profileId: number,
        readonly profileName: string,
        readonly description: string,
    ) { }

    public get className(): string {
        return this._className;
    }
}