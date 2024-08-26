import { OperationDTO } from "../data-transfer-objects/OperationDTO";
import { OperationRoot } from "../interfaces/OperationRoot";
import { OperationId } from "../value-objects/OperationId";
import { OperationName } from "../value-objects/OperationName";
import { OperationState } from "../value-objects/OperationState";

export class Operation implements OperationRoot {

    constructor(
        readonly name: OperationName,
        readonly id: OperationId,
        readonly state: OperationState
    ) { }

    static create(name: OperationName, id: OperationId, state: OperationState): Operation {
        return new Operation(name, id, state)
    }

    static fromPrimitives(data: OperationDTO): Operation {
        return new Operation(
            new OperationName(data.name),
            new OperationId(data.id),
            new OperationState(data.state)
        )
    }

    toPrimitives(): OperationDTO{
        return new OperationDTO(
            this.name.value,
            this.id.value,
            this.state.value
        )
    }
}