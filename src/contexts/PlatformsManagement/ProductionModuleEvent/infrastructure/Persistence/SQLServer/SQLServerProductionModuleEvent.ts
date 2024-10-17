import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { ProductionModuleEvent } from "../../../domain/entities/ProductionModuleEvent";
import { ProductionModuleEventRepository } from "../../../domain/repositories/ProductionModuleEventRepository";
import sql from 'mssql';
import { ProductionModuleEventMapperDTO, ProductionModuleEventPersistenceObject } from "../Mappers/ProductionModuleEventMapperDTO";

export class SQLServerProductionModuleEvent extends SQLServerRepository implements ProductionModuleEventRepository{
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }
    async search(): Promise<ProductionModuleEvent[]> {
        const params: Array<dbParameters> = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'evento_modulo'
            }
        ]
        try {
            const result: ProductionModuleEventPersistenceObject[] = await this.execute(params);
            return result.map(ProductionModuleEventMapperDTO.convertFromPersistenceObject);
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}