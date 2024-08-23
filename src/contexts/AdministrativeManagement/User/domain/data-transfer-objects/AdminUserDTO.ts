import { UserPermissionDTO } from "../../../UserPermission/domain/data-transfer-objects/UserPermissionDTO";

export class AdminUserDTO {
    private _className: string = 'User.AdminDTO';

    constructor(
        readonly id: string,
        readonly name: string,
        readonly profileId: number,
        readonly profileName: string,
        readonly description: string,
        readonly permissions: UserPermissionDTO[],
    ) { }

    public get className(): string {
        return this._className;
    }
}