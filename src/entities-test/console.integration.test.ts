import { container } from "../server/SewingProductionAreaManagement/dependency-inyection/application";
import { SQLServerCountingOrderRecordsRepository } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/infrastructure/persistence/SQLServer/SQLServerCountingOrderRecordsRepository'
import { CountingRecordsOrderId } from "../contexts/SewingProductionAreaManagement/CountingRecordsOrder/domain/value-objects/CountingRecordsOrderId";
import { } from 'uuid'
import { SQLServerPoolFactory } from "../contexts/Shared/infrastructure/persistence/SQLServere/SQLServerPoolFactory";
import { SQLServerConfigFactory } from "../contexts/SewingProductionAreaManagement/Shared/infrastructure/persistence/SQLServer/SQLServerConfigFactory";

const repo = container.get<SQLServerCountingOrderRecordsRepository>('SewingProductionAreaManagement.infrastructure.CountingRecordsOrder.SqlServerCountingOrderRecordsRepository');

async function query() {
    try {
        const id = new CountingRecordsOrderId(CountingRecordsOrderId.random().value);
        await repo.find(id)
        // const pool = await container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager')

        // const pool = await SQLServerPoolFactory.createPool('SewingProductionAreaManagement',SQLServerConfigFactory.createConfig())
        // console.log(pool)
    } catch (error) {
        console.log(error)
    }
}

query();