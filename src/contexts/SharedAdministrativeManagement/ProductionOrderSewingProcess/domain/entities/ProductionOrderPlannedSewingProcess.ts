import { ProductionOrderExecutedAmount } from "../../../../Shared/domain/value-object/ProductionOrderExecutedAmount";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderPlannedAmount } from "../../../../Shared/domain/value-object/ProductionOrderPlannedAmount";
import { ProductionOrderProcessEndDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDate";
import { ProductionOrderProcessEndDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDate";
import { ProductionOrderProcessStartDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderProcessId } from "../../../Shared/domain/value-objects/ProductionOrderProcessId";
import { ProductionOrderType } from "../../../Shared/domain/value-objects/ProductionOrderType";
import { ProductionOrderPlannedSewingProcessDTO } from "../data-transfer-objects/ProductionOrderPlannedSewingProcessDTO";
import { ProductionOrderSewingProcess } from "../interfaces/ProductionOrderSewingProcess";
import { ProductionModuleId } from "../value-objects/ProductionModuleId";

export class ProductionOrderPlannedSewingProcess implements ProductionOrderSewingProcess {
    constructor(
        readonly productionOrderId: ProductionOrderId,
        readonly proccessId: ProductionOrderProcessId,
        readonly productionOrderType: ProductionOrderType,
        readonly executedAmount: ProductionOrderExecutedAmount,
        readonly plannedProductionModuleId: ProductionModuleId,
        readonly plannedStartDate: ProductionOrderProcessStartDatePlanned,
        readonly plannedEndDate: ProductionOrderProcessEndDatePlanned,
        readonly executedStartDate: ProductionOrderProcessStartDate | null,
        readonly executedEndDate: ProductionOrderProcessEndDate | null
    ) { }

    static create(
        productionOrderId: ProductionOrderId,
        proccessId: ProductionOrderProcessId,
        productionOrderType: ProductionOrderType,
        executedAmount: ProductionOrderExecutedAmount,
        plannedProductionModuleId: ProductionModuleId,
        plannedStartDate: ProductionOrderProcessStartDatePlanned,
        plannedEndDate: ProductionOrderProcessEndDatePlanned,
        executedStartDate: ProductionOrderProcessStartDate | null,
        executedEndDate: ProductionOrderProcessEndDate | null
    ): ProductionOrderPlannedSewingProcess {
        return new ProductionOrderPlannedSewingProcess(
            productionOrderId,
            proccessId,
            productionOrderType,
            executedAmount,
            plannedProductionModuleId,
            plannedStartDate,
            plannedEndDate,
            executedStartDate,
            executedEndDate
        )
    }

    static fromPrimitives(data: ProductionOrderPlannedSewingProcessDTO): ProductionOrderPlannedSewingProcess {
        return new ProductionOrderPlannedSewingProcess(
            new ProductionOrderId(data.productionOrderId),
            new ProductionOrderProcessId(data.proccessId),
            new ProductionOrderType(data.productionOrderType),
            new ProductionOrderExecutedAmount(data.executedAmount),
            new ProductionModuleId(data.plannedProductionModuleId),
            new ProductionOrderProcessStartDatePlanned(data.plannedStartDate),
            new ProductionOrderProcessEndDatePlanned(data.plannedEndDate),
            data.executedStartDate ? new ProductionOrderProcessStartDate(data.executedStartDate) : null,
            data.executedEndDate ? new ProductionOrderProcessEndDate(data.executedEndDate) : null
        );
    }

    toPrimitives(): ProductionOrderPlannedSewingProcessDTO {
        return new ProductionOrderPlannedSewingProcessDTO(
            this.productionOrderId.value,
            this.proccessId.value,
            this.productionOrderType.value,
            this.executedAmount.value,
            this.plannedProductionModuleId.value,
            this.plannedStartDate.value,
            this.plannedEndDate.value,
            this.executedStartDate ? this.executedStartDate.value : null,
            this.executedEndDate ? this.executedEndDate.value : null,
        )
    }
}