import { Response } from "../../../../../Shared/domain/CQRS/Response";
import { CountingRecordsOrderViewDTO } from "../../../domain/data-transfer-object/CountingRecordsOrderViewDTO";

export class CountingRecordsOrderResponse extends CountingRecordsOrderViewDTO implements Response { }