import { UserPermissionDTO } from "../data-transfer-objects/UserPermissionDTO";
import { UserPermissionRoot } from "../interfaces/UserPermissionRoot";
import { UserPermissionId } from "../value-objects/UserPermissionId";
import { UserPermissionLabel } from "../value-objects/UserPermissionLabel";
import { UserPermissionState } from "../value-objects/UserPermissionState";

export class UserPermission implements UserPermissionRoot {

    readonly state: UserPermissionState;
    readonly id: UserPermissionId;
    readonly label: UserPermissionLabel;

    constructor(
        id: UserPermissionId,
        label: UserPermissionLabel,
        state?: UserPermissionState
    ) {
        this.id = id;
        this.label = label;
        this.state = state ?? new UserPermissionState(true);
    }

    static create(
        id: UserPermissionId,
        label: UserPermissionLabel,
        state: UserPermissionState
    ): UserPermission {
        return new UserPermission(
            id,
            label,
            state
        )
    }

    isUserPermissionValid(userPermission: UserPermission): boolean {
        return (
            this.id.equals(userPermission.id) &&
                this.label.equals(userPermission.label) &&
                this.state ? this.state.equals(userPermission.state) : true
        )
    }

    static fromPrimitives(data: UserPermissionDTO): UserPermission {
        return new UserPermission(
            new UserPermissionId(data.id),
            new UserPermissionLabel(data.label),
            new UserPermissionState(data.state)
        )
    }

    toPrimitives(): UserPermissionDTO {
        return new UserPermissionDTO(
            this.id.value,
            this.label.value,
            this.state.value
        )
    }

}