import { ProductionOrderCuttingProcessRoot } from "../interface/ProductionOrderCuttingProcessRoot";
import { ProductionOrderExecutedAmount } from "../../../../Shared/domain/value-object/ProductionOrderExecutedAmount";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderPlannedAmount } from "../../../../Shared/domain/value-object/ProductionOrderPlannedAmount";
import { ProductionOrderProcessEndDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDate";
import { ProductionOrderProcessEndDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDate";
import { ProductionOrderProcessStartDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderProcessId } from "../../../Shared/domain/value-objects/ProductionOrderProcessId";
import { ProductionOrderType } from "../../../Shared/domain/value-objects/ProductionOrderType";
import { ProductionOrderPlannedCuttingProcessDTO } from "../data-transfer-object/ProductionOrderPlannedCuttingProcessDTO";

export class ProductionOrderPlannedCuttingProcess implements ProductionOrderCuttingProcessRoot {
    constructor(
        readonly productionOrderId: ProductionOrderId,
        readonly proccessId: ProductionOrderProcessId,
        readonly productionOrderType: ProductionOrderType,
        readonly executedAmount: ProductionOrderExecutedAmount,
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
        plannedStartDate: ProductionOrderProcessStartDatePlanned,
        plannedEndDate: ProductionOrderProcessEndDatePlanned,
        executedStartDate: ProductionOrderProcessStartDate | null,
        executedEndDate: ProductionOrderProcessEndDate | null
    ): ProductionOrderPlannedCuttingProcess {
        return new ProductionOrderPlannedCuttingProcess(
            productionOrderId,
            proccessId,
            productionOrderType,
            executedAmount,
            plannedStartDate,
            plannedEndDate,
            executedStartDate,
            executedEndDate
        )
    }

    static fromPrimitives(data: ProductionOrderPlannedCuttingProcessDTO): ProductionOrderPlannedCuttingProcess {
        return new ProductionOrderPlannedCuttingProcess(
            new ProductionOrderId(data.productionOrderId),
            new ProductionOrderProcessId(data.proccessId),
            new ProductionOrderType(data.productionOrderType),
            new ProductionOrderExecutedAmount(data.executedAmount),
            new ProductionOrderProcessStartDatePlanned(data.plannedStartDate),
            new ProductionOrderProcessEndDatePlanned(data.plannedEndDate),
            data.executedStartDate ? new ProductionOrderProcessStartDate(data.executedStartDate) : null,
            data.executedEndDate ? new ProductionOrderProcessEndDate(data.executedEndDate) : null
        );
    }

    toPrimitives(): ProductionOrderPlannedCuttingProcessDTO {
        return new ProductionOrderPlannedCuttingProcessDTO(
            this.productionOrderId.value,
            this.proccessId.value,
            this.productionOrderType.value,
            this.executedAmount.value,
            this.plannedStartDate.value,
            this.plannedEndDate.value,
            this.executedStartDate ? this.executedStartDate.value : null,
            this.executedEndDate ? this.executedEndDate.value : null,
        )
    }
}