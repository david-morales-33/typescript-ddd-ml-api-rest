import { CommonCreationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonModificationEventDTO";

export class AuthUserDTO {

    private _className: string = 'User.authDTO'

    constructor(
        readonly id: string,
        readonly name: string,
        readonly idType: number,
        readonly profileId: number,
        readonly description: string,
        readonly password: string,
        readonly state: boolean,
        readonly eventList: (CommonCreationEventDTO | CommonModificationEventDTO)[]
    ) { }

    public get className(): string {
        return this._className;
    }
}