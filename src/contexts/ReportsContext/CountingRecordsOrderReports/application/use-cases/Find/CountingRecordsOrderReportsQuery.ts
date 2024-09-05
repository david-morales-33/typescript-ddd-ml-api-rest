import { Query } from '../../../../../Shared/domain/Query'

export class CountingRecordsOrderReportsQuery implements Query {
    constructor(
        readonly reference: string,
        readonly productionOrderType: string
    ) { }
}