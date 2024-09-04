import { Response } from "../../../../Shared/domain/design-patterns/CQRS/Response";
import { CountingRecordsOrderViewDTO } from "../../../domain/data-transfer-object/CountingRecordsOrderViewDTO";

export class CountingRecordsOrderResponse extends CountingRecordsOrderViewDTO implements Response { }