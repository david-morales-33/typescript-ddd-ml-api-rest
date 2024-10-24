import { ProductionOrderExecutedAmount } from "../../../../Shared/domain/value-object/ProductionOrderExecutedAmount";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderPlannedAmount } from "../../../../Shared/domain/value-object/ProductionOrderPlannedAmount";
import { ProductionOrderProcessEndDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDate";
import { ProductionOrderProcessEndDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDate";
import { ProductionOrderProcessStartDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderProcessId } from "../../../Shared/domain/value-objects/ProductionOrderProcessId";
import { ProductionOrderType } from "../../../Shared/domain/value-objects/ProductionOrderType";
import { ProductionOrderNotPlannedSewingProcessDTO } from "../data-transfer-objects/ProductionOrderNotPlannedSewingProcessDTO";
import { ProductionOrderSewingProcess } from "../interfaces/ProductionOrderSewingProcess";
import { ProductionModuleId } from "../value-objects/ProductionModuleId";

export class ProductionOrderNotPlannedSewingProcess implements ProductionOrderSewingProcess {
    private _plannedProductionModuleId: ProductionModuleId | null = null;
    private _plannedStartDate: ProductionOrderProcessStartDatePlanned | null = null;
    private _plannedEndDate: ProductionOrderProcessEndDatePlanned | null = null;

    constructor(
        readonly productionOrderId: ProductionOrderId,
        readonly proccessId: ProductionOrderProcessId,
        readonly productionOrderType: ProductionOrderType,
        readonly executedAmount: ProductionOrderExecutedAmount,
        readonly plannedAmount: ProductionOrderPlannedAmount,
        readonly executedStartDate: ProductionOrderProcessStartDate | null,
        readonly executedEndDate: ProductionOrderProcessEndDate | null
    ) { }

    public get plannedProductionModuleId(): ProductionModuleId | null {
        return this._plannedProductionModuleId;
    }

    public get plannedStartDate(): ProductionOrderProcessStartDatePlanned | null {
        return this._plannedStartDate;
    }

    public get plannedEndDate(): ProductionOrderProcessEndDatePlanned | null {
        return this._plannedEndDate;
    }

    static create(
        productionOrderId: ProductionOrderId,
        proccessId: ProductionOrderProcessId,
        productionOrderType: ProductionOrderType,
        executedAmount: ProductionOrderExecutedAmount,
        plannedAmount: ProductionOrderPlannedAmount,
        executedStartDate: ProductionOrderProcessStartDate | null,
        executedEndDate: ProductionOrderProcessEndDate | null
    ): ProductionOrderNotPlannedSewingProcess {
        return new ProductionOrderNotPlannedSewingProcess(
            productionOrderId,
            proccessId,
            productionOrderType,
            executedAmount,
            plannedAmount,
            executedStartDate,
            executedEndDate
        )
    }
    updateProcessStartDatePlanned(value: Date): ProductionOrderProcessStartDatePlanned {
        return new ProductionOrderProcessStartDatePlanned(value)
    }

    updateProcessEndDatePlanned(value: Date): ProductionOrderProcessStartDatePlanned {
        return new ProductionOrderProcessStartDatePlanned(value)
    }

    updateProductionModulePlanned(value: number): ProductionModuleId {
        return new ProductionModuleId(value)
    }

    static fromPrimitives(data: ProductionOrderNotPlannedSewingProcessDTO): ProductionOrderNotPlannedSewingProcess {
        return new ProductionOrderNotPlannedSewingProcess(
            new ProductionOrderId(data.productionOrderId),
            new ProductionOrderProcessId(data.proccessId),
            new ProductionOrderType(data.productionOrderType),
            new ProductionOrderExecutedAmount(data.executedAmount),
            new ProductionOrderPlannedAmount(data.plannedAmount),
            data.executedStartDate ? new ProductionOrderProcessStartDate(data.executedStartDate) : null,
            data.executedEndDate ? new ProductionOrderProcessEndDate(data.executedEndDate) : null
        );
    }

    toPrimitives(): ProductionOrderNotPlannedSewingProcessDTO {
        return new ProductionOrderNotPlannedSewingProcessDTO(
            this.productionOrderId.value,
            this.proccessId.value,
            this.productionOrderType.value,
            this.executedAmount.value,
            this.plannedAmount.value,
            this._plannedProductionModuleId ? this._plannedProductionModuleId.value : null,
            this.executedStartDate ? this.executedStartDate.value : null,
            this.executedEndDate ? this.executedEndDate.value : null,
            this._plannedStartDate ? this._plannedStartDate.value : null,
            this._plannedEndDate ? this._plannedEndDate.value : null
        )
    }
}