import { ProductionOrderExecutedAmount } from "../../../../Shared/domain/value-object/ProductionOrderExecutedAmount";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderProcessEndDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDate";
import { ProductionOrderProcessEndDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDate";
import { ProductionOrderProcessStartDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderNotPlannedSewingProcess } from "../../../ProductionOrderSewingProcess/domain/entities/ProductionOrderNotPlannedSewingProcess";
import { ProductionOrderProcessId } from "../../../Shared/domain/value-objects/ProductionOrderProcessId";
import { ProductionOrderType } from "../../../Shared/domain/value-objects/ProductionOrderType";
import { ProductionOrderNotPlannedCuttingProcessDTO } from "../data-transfer-object/ProductionOrderNotPlannedCuttingProcessDTO";
import { ProductionOrderCuttingProcessRoot } from "../interface/ProductionOrderCuttingProcessRoot";

export class ProductionOrderNotPlannedCuttingProcess implements ProductionOrderCuttingProcessRoot {

    private _plannedStartDate: ProductionOrderProcessStartDatePlanned | null = null;
    private _plannedEndDate: ProductionOrderProcessEndDatePlanned | null = null;
    constructor(
        readonly productionOrderId: ProductionOrderId,
        readonly proccessId: ProductionOrderProcessId,
        readonly productionOrderType: ProductionOrderType,
        readonly executedAmount: ProductionOrderExecutedAmount,
        readonly executedStartDate: ProductionOrderProcessStartDate | null,
        readonly executedEndDate: ProductionOrderProcessEndDate | null
    ){}

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
        executedStartDate: ProductionOrderProcessStartDate | null,
        executedEndDate: ProductionOrderProcessEndDate | null
    ): ProductionOrderNotPlannedSewingProcess {
        return new ProductionOrderNotPlannedSewingProcess(
            productionOrderId,
            proccessId,
            productionOrderType,
            executedAmount,
            executedStartDate,
            executedEndDate
        )
    }

    plannedProccess(
        startDatePlanned: ProductionOrderProcessStartDatePlanned,
        endDatePlanned: ProductionOrderProcessEndDatePlanned,
    ) {
        this._plannedStartDate = startDatePlanned;
        this._plannedEndDate = endDatePlanned;
    }

    static fromPrimitives(data: ProductionOrderNotPlannedCuttingProcessDTO): ProductionOrderNotPlannedCuttingProcess {
        return new ProductionOrderNotPlannedCuttingProcess(
            new ProductionOrderId(data.productionOrderId),
            new ProductionOrderProcessId(data.proccessId),
            new ProductionOrderType(data.productionOrderType),
            new ProductionOrderExecutedAmount(data.executedAmount),
            data.executedStartDate ? new ProductionOrderProcessStartDate(data.executedStartDate) : null,
            data.executedEndDate ? new ProductionOrderProcessEndDate(data.executedEndDate) : null
        );
    }
    
    toPrimitives(): ProductionOrderNotPlannedCuttingProcessDTO {
        return new ProductionOrderNotPlannedCuttingProcessDTO(
            this.productionOrderId.value,
            this.proccessId.value,
            this.productionOrderType.value,
            this.executedAmount.value,
            this.executedStartDate ? this.executedStartDate.value : null,
            this.executedEndDate ? this.executedEndDate.value : null,
            this._plannedStartDate ? this._plannedStartDate.value : null,
            this._plannedEndDate ? this._plannedEndDate.value : null
        )
    }
}