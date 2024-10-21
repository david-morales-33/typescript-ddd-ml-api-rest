import { CountingRecordsOrderReportsQuery} from './CountingRecordsOrderReportsQuery';
import { CountingRecordsOrderReportsResponse } from './CountingRecordsOrderReportsResponse';
import { CountingRecordsOrderReportsSearcher } from './CountingRecordsOrderReportsSearcher';
import { QueryHandler } from '../../../../../Shared/domain/CQRS/QueryHandler';
import { Query } from '../../../../../Shared/domain/CQRS/Query';

export class CountingRecordsOrderReportsQueryHandler implements QueryHandler<CountingRecordsOrderReportsQuery, CountingRecordsOrderReportsResponse>{

    constructor(private countingRecordsOrderReportsSearcher: CountingRecordsOrderReportsSearcher){}
    
    subscribedTo(): Query {
        return CountingRecordsOrderReportsQuery;
    }

    async handle(): Promise<CountingRecordsOrderReportsResponse> {
        return await this.countingRecordsOrderReportsSearcher.execute()
    }
}