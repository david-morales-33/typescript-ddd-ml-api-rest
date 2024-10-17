import { Query } from '../../../../../Shared/domain/CQRS/Query';
import { QueryHandler } from '../../../../../Shared/domain/CQRS/QueryHandler';
import { CountingRecordsOrderReportsId } from '../../../domain/value-objects/CountingRecordsOrderReportsId';
import { CountingRecordsOrderReportsReference } from '../../../domain/value-objects/CountingRecordsOrderReportsReference';
import { CountingRecordsOrderReportsProductionOrderType } from '../../../domain/value-objects/CountingRecordsOrderReportsType';
import { CountingRecordsOrderReportsQuery } from '../Find/CountingRecordsOrderReportsQuery';
import { CountingRecordsOrderReportsResponse } from '../Find/CountingRecordsOrderReportsResponse';
import { CountingRecordsOrderReportsFinder } from '../Find/CountingRecordsOrderResportsFinder';

export class CountingRecordsOrderReportsQueryHandler implements QueryHandler<CountingRecordsOrderReportsQuery, CountingRecordsOrderReportsResponse> {

    constructor(private countingRecordsOrderReportsFinder: CountingRecordsOrderReportsFinder) { }

    subscribedTo(): Query {
        return CountingRecordsOrderReportsQuery;
    }

    async handle(query: CountingRecordsOrderReportsQuery): Promise<CountingRecordsOrderReportsResponse> {

        const reference = new CountingRecordsOrderReportsReference(query.reference);
        const productionOrderType = new CountingRecordsOrderReportsProductionOrderType(query.productionOrderType);
        const countingRecordsOrderReportsId = new CountingRecordsOrderReportsId(reference, productionOrderType);

        return await this.countingRecordsOrderReportsFinder.execute(countingRecordsOrderReportsId);
    }
}