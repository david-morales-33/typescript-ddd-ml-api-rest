import { CommonCreationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonModificationEventDTO";
import { CommonCreationEvent } from "../../../../Shared/domain/entities/CommonCreationEvent";
import { CommonModificationEvent } from "../../../../Shared/domain/entities/CommonModificationEvent";
import { EventId } from "../../../../Shared/domain/value-object/EventId";
import { UserDescription } from "../../../../Shared/domain/value-object/UserDescription";
import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { UserIdType } from "../../../../Shared/domain/value-object/UserIdType";
import { UserName } from "../../../../Shared/domain/value-object/UserName";
import { UserProfileId } from "../../../../Shared/domain/value-object/UserProfileId";
import { UserState } from "../../../../Shared/domain/value-object/UserState";
import { AuthUserDTO } from "../data-transfer-objects/AuthUserDTO";
import { UserRoot } from "../interface/UserRoot";
import { PasswordService } from "../services/PasswordService";
import { UserPassword } from "../../../../Shared/domain/value-object/UserPassword";

export class AuthUser implements UserRoot {
    readonly id: UserId;
    private _name: UserName;
    private _profileId: UserProfileId;
    private _description: UserDescription;
    private _idType: UserIdType;
    private _password: UserPassword;
    private _state: UserState;
    readonly eventList: (CommonCreationEvent | CommonModificationEvent)[];

    constructor(
        id: UserId,
        name: UserName,
        idType: UserIdType,
        profileId: UserProfileId,
        description: UserDescription,
        password: UserPassword,
        state: UserState,
        eventList: (CommonCreationEvent | CommonModificationEvent)[]
    ) {
        this.id = id;
        this._name = name;
        this._profileId = profileId;
        this._description = description;
        this._idType = idType;
        this._password = password;
        this._state = state;
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
    public get state(): UserState {
        return this._state;
    }

    static create(
        id: UserId,
        name: UserName,
        idType: UserIdType,
        profileId: UserProfileId,
        description: UserDescription,
        password: UserPassword,
        state: UserState,
        eventList: (CommonCreationEvent | CommonModificationEvent)[]

    ): AuthUser {
        return new AuthUser(
            id,
            name,
            idType,
            profileId,
            description,
            password,
            state,
            eventList
        )
    }

    updateUserName(params: { value: UserName, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (this._name.value !== value.value && !this.hasAddedEvent(event.id)) {
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
        if (this._profileId.value !== value.value && !this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._profileId = this.profileId.setValue(value.value)
        }
    }

    updateUserDescription(params: { value: UserDescription, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (this._description.value !== value.value && !this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._description = this.description.setValue(value.value)
        }
    }

    updateUserIdType(params: { value: UserIdType, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (this.idType.value !== value.value && !this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._idType = this.idType.setValue(value.value)
        }
    }

    updateUserState(params: { value: UserState, event: CommonModificationEvent }): void {
        const { value, event } = params;
        if (this._state.value !== value.value && !this.hasAddedEvent(event.id)) {
            this.addNewEvent(event);
            this._state ?
                this._state = this.state.setInFalse() :
                this._state = this.state.setInTrue();

        }
    }

    private addNewEvent(event: CommonModificationEvent): void {
        this.eventList.push(event);
    }

    private hasAddedEvent(eventId: EventId) {
        const eventFound = this.eventList.find(elemente => elemente.id.value === eventId.value);
        return eventFound !== undefined;
    }

    public async checkPassword(service: PasswordService, password: UserPassword): Promise<boolean> {
        return (await service.compare(this._password, password)).value;
    }

    static fromPrimitives(data: AuthUserDTO): AuthUser {
        return new AuthUser(
            new UserId(data.id),
            new UserName(data.name),
            new UserIdType(data.idType),
            new UserProfileId(data.profileId),
            new UserDescription(data.description),
            new UserPassword(data.password),
            new UserState(data.state),
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
            this.state.value,
            this.eventList.map(entry => {
                return entry.toPrimitives()
            })
        )
    }
}