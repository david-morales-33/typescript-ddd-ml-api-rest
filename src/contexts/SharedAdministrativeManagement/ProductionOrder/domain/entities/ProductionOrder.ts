import { CommonModificationEvent } from "../../../../Shared/domain/entities/CommonModificationEvent";
import { CreationDate } from "../../../../Shared/domain/value-object/CreationDate";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderProcessEndDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDate";
import { ProductionOrderProcessEndDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDate";
import { ProductionOrderProcessStartDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ReferenceId } from "../../../../Shared/domain/value-object/ReferenceId";
import { ProductionOrderNotPlannedSewingProcess } from "../../../ProductionOrderSewingProcess/domain/entities/ProductionOrderNotPlannedSewingProcess";
import { ProductionOrderPlannedSewingProcess } from "../../../ProductionOrderSewingProcess/domain/entities/ProductionOrderPlannedSewingProcess";
import { ProductionOrderGarmentType } from "../value-objects/ProductionOrderGarmentType";
import { ProductionOrderProccessState } from "../value-objects/ProductionOrderProccessState";

export class ProductionOrder {
    private _processStartDate: ProductionOrderProcessStartDate | null = null;
    private _processEndDate: ProductionOrderProcessEndDate | null = null;
    private _processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null = null;
    private _processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null = null;
    private _sewingProccess: ProductionOrderNotPlannedSewingProcess | ProductionOrderPlannedSewingProcess | null = null;
    
    constructor(
        readonly productionOrderId: ProductionOrderId,
        readonly reference: ReferenceId,
        readonly garmentType: ProductionOrderGarmentType,
        readonly administrativeEventList: CommonModificationEvent[],
        readonly creationDate: CreationDate,
        readonly state: ProductionOrderProccessState
    ) { }
}