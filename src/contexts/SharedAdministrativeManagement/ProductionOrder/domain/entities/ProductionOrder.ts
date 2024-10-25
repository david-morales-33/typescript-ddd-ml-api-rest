import { CommonModificationEvent } from "../../../../Shared/domain/entities/CommonModificationEvent";
import { CreationDate } from "../../../../Shared/domain/value-object/CreationDate";
import { ProductionOrderExecutedAmount } from "../../../../Shared/domain/value-object/ProductionOrderExecutedAmount";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderPlannedAmount } from "../../../../Shared/domain/value-object/ProductionOrderPlannedAmount";
import { ProductionOrderProcessEndDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDate";
import { ProductionOrderProcessEndDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDate } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDate";
import { ProductionOrderProcessStartDatePlanned } from "../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ReferenceId } from "../../../../Shared/domain/value-object/ReferenceId";
import { ProductionOrderNotPlannedSewingProcess } from "../../../ProductionOrderSewingProcess/domain/entities/ProductionOrderNotPlannedSewingProcess";
import { ProductionOrderPlannedSewingProcess } from "../../../ProductionOrderSewingProcess/domain/entities/ProductionOrderPlannedSewingProcess";
import { ProductionModuleId } from "../../../ProductionOrderSewingProcess/domain/value-objects/ProductionModuleId";
import { ProductionOrderProcessId } from "../../../Shared/domain/value-objects/ProductionOrderProcessId";
import { ProductionOrderType } from "../../../Shared/domain/value-objects/ProductionOrderType";
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

    public get processStartDate(): ProductionOrderProcessStartDate | null {
        return this._processStartDate;
    }

    public get processEndDate(): ProductionOrderProcessEndDate | null {
        return this._processEndDate;
    }

    public get processStartDatePlanned(): ProductionOrderProcessStartDatePlanned | null {
        return this._processStartDatePlanned;
    }

    public get processEndDatePlanned(): ProductionOrderProcessEndDatePlanned | null {
        return this._processEndDatePlanned;
    }

    public get sewingProccess(): ProductionOrderNotPlannedSewingProcess | ProductionOrderPlannedSewingProcess | null {
        return this._sewingProccess;
    }

    public set setSewingProccess(value: ProductionOrderNotPlannedSewingProcess) {
        this._sewingProccess = value;
    }

    public set buildSewingProccess(value: ProductionOrderPlannedSewingProcess) {
        this._sewingProccess = value;
    }

    public set buildProcessStartDate(value: ProductionOrderProcessStartDate) {
        this._processStartDate = value;
    }

    public set buildProcessEndDate(value: ProductionOrderProcessEndDate) {
        this._processEndDate = value;
    }

    plannedProductionOrder(
        processStartDate: ProductionOrderProcessStartDate,
        processEndDate: ProductionOrderProcessEndDate
    ) {
        this._processStartDatePlanned = processStartDate;
        this._processEndDatePlanned = processEndDate;
    }

    plannedSewingProccess(
        productionOrderType: ProductionOrderType,
        plannedProductionModuleId: ProductionModuleId,
        plannedStartDate: ProductionOrderProcessStartDatePlanned,
        plannedEndDate: ProductionOrderProcessEndDatePlanned
    ) {
        const sewingProccess = new ProductionOrderNotPlannedSewingProcess(
            this.productionOrderId,
            new ProductionOrderProcessId(4),
            productionOrderType,
            new ProductionOrderExecutedAmount(0),
            new ProductionOrderPlannedAmount(0),
            null,
            null
        );
        sewingProccess.plannedProccess(
            plannedStartDate,
            plannedEndDate,
            plannedProductionModuleId
        )
        this.setSewingProccess = sewingProccess;
    }
}