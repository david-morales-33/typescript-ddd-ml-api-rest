import { CommonCreationEventDTO } from '../../../AdministrativeEvent/domain/data-transfer-object/CommonCreationEventDTO'
import { CommonModificationEventDTO } from '../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO'
import { CommonCreationEvent } from '../../../AdministrativeEvent/domain/entities/CommonCreationEvent'
import { CommonModificationEvent } from '../../../AdministrativeEvent/domain/entities/CommonModificationEvent'
import { EventId } from '../../../AdministrativeEvent/domain/value-objects/EventId';
import { AuthUserDTO } from "../data-transfer-objects/AuthUserDTO";
import { UserRoot } from "../interfaces/UserRoot";
import { UserDescription } from "../value-objects/UserDescription";
import { UserId } from "../value-objects/UserId";
import { UserIdType } from "../value-objects/UserIdType";
import { UserName } from "../value-objects/UserName";
import { UserPassword } from "../value-objects/UserPassword";
import { UserProfileId } from "../value-objects/UserProfileId";

export class AuthUser implements UserRoot {

    readonly id: UserId;
    private _name: UserName;
    private _profileId: UserProfileId;
    private _description: UserDescription;
    private _idType: UserIdType;
    private _password: UserPassword;
    readonly eventList: (CommonCreationEvent | CommonModificationEvent)[];

    constructor(
        id: UserId,
        name: UserName,
        idType: UserIdType,
        profileId: UserProfileId,
        description: UserDescription,
        password: UserPassword,
        eventList: (CommonCreationEvent | CommonModificationEvent)[]
    ) {
        this.id = id;
        this._name = name;
        this._profileId = profileId;
        this._description = description;
        this._idType = idType;
        this._password = password;
        this.eventList = eventList;
    }

    public get name(): UserName {
        return this._name;
    }

    public get profileId(): UserProfileId {
        return this._profileId;
    }

    public get description(): UserDescription {
        return this._description;
    }

    public get password(): UserPassword {
        return this._password;
    }

    public get idType(): UserIdType {
        return this._idType;
    }

    static create(
        id: UserId,
        name: UserName,
        idType: UserIdType,
        profileId: UserProfileId,
        description: UserDescription,
        password: UserPassword,
        eventList: (CommonCreationEvent | CommonModificationEvent)[]

    ): AuthUser {
        return new AuthUser(
            id,
            name,
            idType,
            profileId,
            description,
            password,
            eventList
        )
    }

    updateUserName(params: { value: UserName, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._name = this.name.setValue(value.value)
        }
    }

    updateUserPassword(params: { value: UserPassword, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._password = this.password.setValue(value.value)
        }
    }

    updateUserProfileId(params: { value: UserProfileId, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._profileId = this.profileId.setValue(value.value)
        }
    }

    updateUserDescription(params: { value: UserDescription, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._description = this.description.setValue(value.value)
        }
    }

    updateUserIdType(params: { value: UserIdType, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (!this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._idType = this.idType.setValue(value.value)
        }
    }

    private addNewEvent(event: CommonModificationEvent): void {
        this.eventList.push(event);
    }

    private hasAddedEvent(eventId: EventId) {
        const eventFound = this.eventList.find(elemente => elemente.id.value === eventId.value);
        return eventFound !== undefined;
    }

    static fromPrimitives(data: AuthUserDTO): AuthUser {
        return new AuthUser(
            new UserId(data.id),
            new UserName(data.name),
            new UserIdType(data.idType),
            new UserProfileId(data.profileId),
            new UserDescription(data.description),
            new UserPassword(data.password),
            data.eventList.map(entry => {
                if (entry.className === 'CreationEvent.commonDTO')
                    return CommonCreationEvent.fromPrimitives(entry as CommonCreationEventDTO)
                return CommonModificationEvent.fromPrimitives(entry as CommonModificationEventDTO)
            })
        )
    }

    toPrimitives(): AuthUserDTO {
        return new AuthUserDTO(
            this.id.value,
            this.name.value,
            this.idType.value,
            this.profileId.value,
            this.description.value,
            this.password.value,
            this.eventList.map(entry => {
                return entry.toPrimitives()
            })
        )
    }
}