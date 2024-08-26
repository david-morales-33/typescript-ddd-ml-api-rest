import { OperationDTO } from "../../domain/data-transfer-objects/OperationDTO";
import { Operation } from "../../domain/entities/Operation";

export class OperationResponse {
    public readonly operations: OperationDTO[];

    constructor(operations: Operation[]) {
        this.operations = operations.map(entry => entry.toPrimitives());
    }
}