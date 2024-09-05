import { QueryHandler } from '../../../../../Shared/domain/QueryHandler';
import { CountingRecordsOrderReportsQuery} from './CountingRecordsOrderReportsQuery';
import { CountingRecordsOrderReportsResponse } from '../SearchAll/CountingRecordsOrderReportsResponse';
import { Query } from '../../../../../Shared/domain/Query';
import { CountingRecordsOrderReportsSearcher } from './CountingRecordsOrderReportsSearcher';


export class CountingRecordsOrderReportsQueryHandler implements QueryHandler<CountingRecordsOrderReportsQuery, CountingRecordsOrderReportsResponse>{

    constructor(private countingRecordsOrderReportsSearcher: CountingRecordsOrderReportsSearcher){}
    
    subscribedTo(): Query {
        return CountingRecordsOrderReportsQuery;
    }

    async handle(): Promise<CountingRecordsOrderReportsResponse> {
        return await this.countingRecordsOrderReportsSearcher.execute()
    }
}