import { CommonCreationEventDTO } from "../../../CreationEvent/domain/data-transfer-objects/CommonCreationEventDTO";

export class AuthUserDTO {

    private _className: string = 'User.authDTO'

    constructor(
        readonly id: string,
        readonly name: string,
        readonly idType: number,
        readonly profileId: number,
        readonly description: string,
        readonly password: string,
        readonly creationEvent: CommonCreationEventDTO
    ) { }

    public get className(): string {
        return this._className;
    }
}