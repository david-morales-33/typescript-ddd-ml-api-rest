import { UserId } from '../value-objects/UserId';
import { CommonUserDTO } from '../data-transfer-objects/CommonUserDTO';
import { UserRoot } from '../interfaces/UserRoot';
import { UserDescription } from '../value-objects/UserDescription';
import { UserName } from '../value-objects/UserName';
import { UserProfileId } from '../value-objects/UserProfileId';
import { UserProfileName } from '../value-objects/UserProfileName';
import { CommonModificationEvent } from '../../../ModificationEvent/domain/entities/CommonModificationEvent';
import { UserPassword } from '../value-objects/UserPassword';


export class CommonUser implements UserRoot {

    readonly id: UserId;
    readonly modificationEventList: CommonModificationEvent[];
    private _name: UserName;
    private _profileId: UserProfileId;
    private _profileName: UserProfileName;
    private _description: UserDescription;

    constructor(
        id: UserId,
        name: UserName,
        profileId: UserProfileId,
        profileName: UserProfileName,
        description: UserDescription,
        modificationEventList: CommonModificationEvent[]
    ) {
        this.id = id;
        this._name = name;
        this._description = description;
        this._profileId = profileId;
        this._profileName = profileName;
        this.modificationEventList = modificationEventList;
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

    public get profileName(): UserProfileName {
        return this._profileName;
    }

    static create(
        id: UserId,
        name: UserName,
        profileId: UserProfileId,
        profileName: UserProfileName,
        description: UserDescription,
        modificationEventList: any[]
    ): CommonUser {
        return new CommonUser(
            id,
            name,
            profileId,
            profileName,
            description,
            modificationEventList
        )
    }

    private updateUserName(value: UserName): void {

    }

    private updateUserPassword(Value:UserPassword ): void {

    }

    private updateUserProfile(): void {

    }

    private updateUserDescription(): void {

    }

    static fromPrimitives(data: CommonUserDTO): CommonUser {
        return new CommonUser(
            new UserId(data.id),
            new UserName(data.name),
            new UserProfileId(data.profileId),
            new UserProfileName(data.profileName),
            new UserDescription(data.description),
            []
        )
    }

    toPrimitives(): CommonUserDTO {
        return new CommonUserDTO(
            this.id.value,
            this.name.value,
            this.profileId.value,
            this.profileName.value,
            this.description.value,
            []
        )
    }
}