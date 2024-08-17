import { Response } from "../../../../Shared/domain/design-patterns/CQRS/Response";
import { CountingRecordsOrderViewDTO } from "../../data-transfer-objects/CountingRecordsOrderViewDTO";

export class CountingRecordsOrderResponse extends CountingRecordsOrderViewDTO implements Response { }