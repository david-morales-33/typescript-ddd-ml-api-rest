import { CountingRecordsOrderReportsId } from '../../../domain/value-objects/CountingRecordsOrderReportsId';
import { CountingRecordsOrderReportsNotFound } from '../../exceptions/CountingRecordsOrderReportsNotFound';
import { CountingRecordsOrderReportsQueryRepository } from '../../../domain/repositories/CountingRecordsOrderReportsQueryRepository';

export class CountingRecordsOrderReportsFinder {
    constructor(private countingRecordsOrderReportsRepository: CountingRecordsOrderReportsQueryRepository) { }
    async execute(countingRecordsOrderReportsId: CountingRecordsOrderReportsId) {

        const countingRecordsOrderReports = await this.countingRecordsOrderReportsRepository.find(countingRecordsOrderReportsId);
        if (countingRecordsOrderReports === null)
            throw new CountingRecordsOrderReportsNotFound(countingRecordsOrderReportsId);
        return countingRecordsOrderReports;
    }
}