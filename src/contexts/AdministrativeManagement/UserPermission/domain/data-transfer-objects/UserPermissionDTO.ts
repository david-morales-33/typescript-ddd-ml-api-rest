

export class UserPermissionDTO {

    private _className: string = 'UserPermission.DTO'

    constructor(
        readonly id: number,
        readonly label: string,
        readonly state: boolean
    ) { }

    public get className(): string {
        return this._className;
    }
}