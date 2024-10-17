import { Operation } from "../../domain/entities/Operation";

export interface OperationResponse {
    operacionId: number,
    perfilId: number,
    plataformaId: number,
    operacion: string,
    estado: boolean
}

export class OperationsResponse {
    public readonly operations: OperationResponse[];
    constructor(operations: Operation[]) {
        this.operations = operations.map(entry => {
            return {
                operacionId: entry.id.value,
                perfilId: entry.profileId.value,
                plataformaId: entry.platformId.value,
                operacion: entry.label.value,
                estado: true
            }
        })
    }
}