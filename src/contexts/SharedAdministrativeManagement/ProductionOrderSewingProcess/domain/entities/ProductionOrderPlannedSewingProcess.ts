import { ProductionOrderExecutedAmount } from "../../../../Shared/domain/value-object/ProductionOrderExecutedAmount";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderPlannedAmount } from "../../../../Shared/domain/value-object/ProductionOrderPlannedAmount";
import { ProductionOrderProcessEndDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDate";
import { ProductionOrderProcessEndDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDate";
import { ProductionOrderProcessStartDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderProcessId } from "../../../Shared/domain/value-objects/ProductionOrderProcessId";
import { ProductionOrderType } from "../../../Shared/domain/value-objects/ProductionOrderType";
import { ProductionOrderSewingProcess } from "../interfaces/ProductionOrderSewingProcess";

export class ProductionOrderPlannedSewingProcess implements ProductionOrderSewingProcess{
    private _plannedProductionModuleId: any;
    private _plannedStartDate: ProductionOrderProcessStartDatePlanned | null = null;
    private _plannedEndDate: ProductionOrderProcessEndDatePlanned | null;

    constructor(
        readonly productionOrderId: ProductionOrderId,
        readonly proccessId: ProductionOrderProcessId,
        readonly productionOrderType: ProductionOrderType,
        readonly executedAmount: ProductionOrderExecutedAmount,
        readonly plannedAmount: ProductionOrderPlannedAmount,
        readonly executedStartDate: ProductionOrderProcessStartDate | null,
        readonly executedEndDate: ProductionOrderProcessEndDate | null
    ) { }

    // static create(): ProductionOrderSewingProcess {
    //     return new ProductionOrderSewingProcess(

    //     )
    // }

    toPrimitives() {
        
    }
}