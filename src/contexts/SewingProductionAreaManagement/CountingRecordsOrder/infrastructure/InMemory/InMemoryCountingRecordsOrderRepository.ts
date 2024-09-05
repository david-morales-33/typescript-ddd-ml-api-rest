import { CountingRecordsOrderViewDTO } from "../../domain/data-transfer-object/CountingRecordsOrderViewDTO";
import { CountingRecordsOrderResponseRepository } from "../../domain/repositories/CountingRecordsOrderResponseRepository";
import { CountingRecordsOrderId } from "../../domain/value-objects/CountingRecordsOrderId";

export class InMemoryCountingRecordsOrderRepository implements CountingRecordsOrderResponseRepository {

    private countingRecordsOrderList: CountingRecordsOrderViewDTO[];

    constructor() {
        this.countingRecordsOrderList =
            [
                new CountingRecordsOrderViewDTO('uaays-asas-a4s7-ruhebebaas-ttgtd',
                    'MOP3547', 'MAR3548', 'XL', '1000', 'BLANCO', 80, '7777844544545', '12:20:14', '01:15:03', 1, 'PRIMERA', 1, 'MODULO-1', true, null, null, '1146441925', 'David Morales', new Date(), null, null, null, null),
                new CountingRecordsOrderViewDTO('uaays-asas-a4s7-ruhebebaas-ttgte',
                    'MOP3547', 'MAR3548', 'XL', '1000', 'BLANCO', 50, '7777844544545', '10:20:14', '11:15:03', 1, 'PRIMERA', 1, 'MODULO-1', true, null, null, '1146441925', 'David Morales', new Date(), null, null, null, null),
                new CountingRecordsOrderViewDTO('uaays-asas-a4s7-ruhebebaas-ttgtf',
                    'MOP3547', 'MAR3548', 'XL', '1000', 'BLANCO', 60, '7777844544545', '08:20:14', '09:15:03', 1, 'PRIMERA', 1, 'MODULO-1', true, null, null, '1146441925', 'David Morales', new Date(), null, null, null, null),
            ]
    }

    async find(countingRecordsOrderId: CountingRecordsOrderId): Promise<CountingRecordsOrderViewDTO | null> {
        /*====================================== integration-test ==========================================
            const inMemoryCountingRecordsOrderRepository = new InMemoryCountingRecordsOrderRepository();
            const countingRecordsOrderFinder = new CountingRecordsOrderFinder(inMemoryCountingRecordsOrderRepository);
            const countingRecordsOrderQueryHandler = new CountingRecordsOrderQueryHandler(countingRecordsOrderFinder);
            const countingRecordsOrderQuery = new CountingRecordsOrderQuery('uaays-asas-a4s7-ruhebebaas-ttgtf')
        */
        const countingRecordsOrder = this.countingRecordsOrderList.find(entry => entry.ocrId === countingRecordsOrderId.value)

        if (countingRecordsOrder === undefined)
            return null;
        return countingRecordsOrder;
    }

    async match(criteria: any): Promise<CountingRecordsOrderViewDTO[]> {
        console.log(criteria)
        return this.countingRecordsOrderList;
    }
}