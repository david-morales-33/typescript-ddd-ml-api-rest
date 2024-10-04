import { Criteria } from "../../../../../Shared/domain/design-patterns/Criteria/Criteria";
import { SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { CountingRecordsOrderViewDTO } from "../../../domain/data-transfer-object/CountingRecordsOrderViewDTO";
import { CountingRecordsOrderResponseRepository } from "../../../domain/repositories/CountingRecordsOrderResponseRepository";
import { CountingRecordsOrderId } from "../../../domain/value-objects/CountingRecordsOrderId";


export class SQLServerCountingOrderRecordsRepository extends SQLServerRepository implements CountingRecordsOrderResponseRepository {

    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_solicitud_ocr_lista_completa';
    }

    async find(countingRecordsOrderId: CountingRecordsOrderId): Promise<CountingRecordsOrderViewDTO | null> {
        console.log(countingRecordsOrderId)
        try {
            const result = await this.execute([])
            console.log(result)
        } catch (error) {
            console.log(error)
        } finally {
            this.disconnection();
        }
        return new CountingRecordsOrderViewDTO('uaays-asas-a4s7-ruhebebaas-ttgtd',
            'MOP3547', 'MAR3548', 'XL', '1000', 'BLANCO', 80, '7777844544545', '12:20:14', '01:15:03', 1, 'PRIMERA', 1, 'MODULO-1', true, null, null, '1146441925', 'David Morales', new Date(), null, null, null, null)
    }

    async match(criteria: Criteria): Promise<CountingRecordsOrderViewDTO[]> {
        console.log(criteria)
        return [
            new CountingRecordsOrderViewDTO('uaays-asas-a4s7-ruhebebaas-ttgtd',
                'MOP3547', 'MAR3548', 'XL', '1000', 'BLANCO', 80, '7777844544545', '12:20:14', '01:15:03', 1, 'PRIMERA', 1, 'MODULO-1', true, null, null, '1146441925', 'David Morales', new Date(), null, null, null, null),
        ]
    }
}