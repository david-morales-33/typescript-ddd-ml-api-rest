import { MenuId } from "../../../Menu/domain/value-objects/MenuId";
import { PlatformId } from "../../../Shared/domain/value-objects/PlatformId";
import { ProfileId } from "../../../Shared/domain/value-objects/ProfileId";
import { OperationDTO } from "../data-transfer-objects/OperationDTO";
import { OperationRoot } from "../interfaces/OperationRoot";
import { OperationId } from "../value-objects/OperationId";
import { OperationName } from "../value-objects/OperationName";
import { OperationState } from "../value-objects/OperationState";

export class Operation implements OperationRoot {
    constructor(
        readonly id: OperationId,
        readonly platformId: PlatformId,
        readonly profileId: ProfileId,
        readonly label: OperationName,
        readonly state: OperationState,
    ) { }

    static create(
        id: OperationId,
        platformId: PlatformId,
        profileId: ProfileId,
        label: OperationName,
        state: OperationState,
    ): Operation {
        return new Operation(
            id,
            platformId,
            profileId,
            label,
            state
        )
    }

    static fromPrimitives(data: OperationDTO): Operation {
        return new Operation(
            new OperationId(data.operationId),
            new PlatformId(data.platformId),
            new ProfileId(data.profileId),
            new OperationName(data.label),
            new OperationState(data.state)
        )
    }

    toPrimitives(): OperationDTO {
        return new OperationDTO(
            this.id.value,
            this.platformId.value,
            this.profileId.value,
            this.label.value,
            this.state.value
        )
    }
}