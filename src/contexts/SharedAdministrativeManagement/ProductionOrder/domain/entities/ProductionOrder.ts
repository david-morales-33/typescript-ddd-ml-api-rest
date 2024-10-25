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
import { ProductionOrderDTO } from "../data-transfer-object/ProductionOrderDTO";
import { ProductionOrderGarmentType } from "../value-objects/ProductionOrderGarmentType";
import { ProductionOrderProccessState } from "../value-objects/ProductionOrderProccessState";

export class ProductionOrder {
    private _processStartDate: ProductionOrderProcessStartDate | null = null;
    private _processEndDate: ProductionOrderProcessEndDate | null = null;
    private _processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null = null;
    private _processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null = null;
    private _sewingProccess: ProductionOrderNotPlannedSewingProcess | ProductionOrderPlannedSewingProcess | null = null;
    private _administrativeEventList: CommonModificationEvent[] = [];

    constructor(
        readonly productionOrderId: ProductionOrderId,
        readonly reference: ReferenceId,
        readonly garmentType: ProductionOrderGarmentType,
        readonly plannedAmount: ProductionOrderPlannedAmount,
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

    public get administrativeEventList(): CommonModificationEvent[]{
        return this._administrativeEventList;
    }

    public get sewingProccess(): ProductionOrderNotPlannedSewingProcess | ProductionOrderPlannedSewingProcess | null {
        return this._sewingProccess;
    }

    private set setSewingProccess(value: ProductionOrderNotPlannedSewingProcess) {
        this._sewingProccess = value;
    }

    public buildSewingProccess(value: ProductionOrderPlannedSewingProcess) {
        this._sewingProccess = value;
    }

    public buildProcessStartDate(value: ProductionOrderProcessStartDate) {
        this._processStartDate = value;
    }

    public buildProcessEndDate(value: ProductionOrderProcessEndDate) {
        this._processEndDate = value;
    }

    static create(
        productionOrderId: ProductionOrderId,
        reference: ReferenceId,
        plannedAmount: ProductionOrderPlannedAmount,
        garmentType: ProductionOrderGarmentType,
        creationDate: CreationDate,
        state: ProductionOrderProccessState
    ): ProductionOrder {
        return new ProductionOrder(
            productionOrderId,
            reference,
            garmentType,
            plannedAmount,
            creationDate,
            state
        )
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
    fromPrimitives(data: ProductionOrderDTO): ProductionOrder {
        return new ProductionOrder(
            new ProductionOrderId(data.productionOrderId),
            new ReferenceId(data.reference),
            new ProductionOrderGarmentType(data.garmentType),
            new ProductionOrderPlannedAmount(data.plannedAmount),
            new CreationDate(data.creationDate),
            new ProductionOrderProccessState(data.state)
        );
    }

    toPrimitives(): ProductionOrderDTO {
        return new ProductionOrderDTO(
            this.productionOrderId.value,
            this.reference.value,
            this.garmentType.value,
            this.plannedAmount.value,
            this.administrativeEventList.map(entry => entry.toPrimitives()),
            this.creationDate.value,
            this.state.value,
            this.processStartDate ? this.processStartDate.value : null,
            this.processEndDate ? this.processEndDate.value : null,
            this.processStartDatePlanned ? this.processStartDatePlanned.value : null,
            this.processEndDatePlanned ? this.processEndDatePlanned.value : null,
            this.sewingProccess ? this.sewingProccess.toPrimitives() : null
        )
    }
}