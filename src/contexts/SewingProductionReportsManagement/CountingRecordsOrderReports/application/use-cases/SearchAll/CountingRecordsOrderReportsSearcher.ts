import { CountingRecordsOrderReportsQueryRepository } from '../../../domain/repositories/CountingRecordsOrderReportsQueryRepository'

export class CountingRecordsOrderReportsSearcher {
    constructor(private countingRecordsOrderReportsQueryRepository: CountingRecordsOrderReportsQueryRepository) { }

    async execute() {
        const countingRecordsOrderReportsList = await this.countingRecordsOrderReportsQueryRepository.searchAll();
        return countingRecordsOrderReportsList;
    }
}