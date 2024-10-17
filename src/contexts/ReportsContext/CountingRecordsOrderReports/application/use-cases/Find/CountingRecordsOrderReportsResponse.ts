import { Response } from '../../../../../Shared/domain/CQRS/Response';
import { CountingRecordsOrderReportsDTO } from '../../../domain/data-transfer-objects/CountingRecordsOrderReportsDTO';

export class CountingRecordsOrderReportsResponse extends CountingRecordsOrderReportsDTO implements Response { }