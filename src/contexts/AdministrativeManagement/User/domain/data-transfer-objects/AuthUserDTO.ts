import { CommonCreationEventDTO } from "../../../CreationEvent/domain/data-transfer-objects/CommonCreationEventDTO";
import { CommonCreationEvent } from "../../../CreationEvent/domain/entities/CommonCreationEvent";
import { EventRoot } from "../../../Event/domain/interfaces/EventRoot";
import { CommonModificationEventDTO } from "../../../ModificationEvent/domain/data-transfer-objects/CommonModificationEventDTO";
import { CommonModificationEvent } from "../../../ModificationEvent/domain/entities/CommonModificationEvent";

export class AuthUserDTO {

    private _className: string = 'User.authDTO'

    constructor(
        readonly id: string,
        readonly name: string,
        readonly idType: number,
        readonly profileId: number,
        readonly description: string,
        readonly password: string,
        readonly eventList: (CommonCreationEventDTO | CommonModificationEventDTO)[]
    ) { }

    public get className(): string {
        return this._className;
    }
}