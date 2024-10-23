import { ProductionScheduleDTO } from "../../../domain/data-transfer-objects/ProductionScheduleDTO";
import { ProductionSchedule } from "../../../domain/entities/ProductionSchedule";

export interface ProductionSchedulePersistenceObject {
    mdl_id: number;
    hrp_id: number;
    hora_inicial: string;
    hora_final: string;
}

export class ProductionScheduleMapperDTO {
    static convertFromPersistenceObject(entity: ProductionSchedulePersistenceObject) {

        const horaInicial = new Date(entity.hora_inicial);
        const horaFinal = new Date(entity.hora_final);

        return ProductionSchedule.fromPrimitives(
            new ProductionScheduleDTO(
                entity.hrp_id,
                entity.mdl_id,
                entity.hora_inicial + ' - ' + entity.hora_final,
                true
            )
        )
    }
}