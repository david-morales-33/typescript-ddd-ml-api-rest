import { OperationDTO } from "../../../domain/data-transfer-objects/OperationDTO";
import { Operation } from "../../../domain/entities/Operation";

export interface OperationPersistenceObject {
    ope_id: number;
    mnu_id: number;
    ptf_id: number;
    prf_id: number;
    operacion: string;
}

export class OperationMapperDTO {
    static convertFromPersistenceObject(entity: OperationPersistenceObject): Operation {
        return Operation.fromPrimitives(
            new OperationDTO(
                entity.ope_id,
                entity.mnu_id,
                entity.ptf_id,
                entity.prf_id,
                entity.operacion,
                true
            )
        )
    }
}