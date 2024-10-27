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
import { ProductionOrderNotPlannedCuttingProcessDTO } from "../../../ProductionOrderCuttingProcess/domain/data-transfer-object/ProductionOrderNotPlannedCuttingProcessDTO";
import { ProductionOrderPlannedCuttingProcessDTO } from "../../../ProductionOrderCuttingProcess/domain/data-transfer-object/ProductionOrderPlannedCuttingProcessDTO";
import { ProductionOrderNotPlannedCuttingProcess } from "../../../ProductionOrderCuttingProcess/domain/entities/ProductionOrderNotPlannedCuttingProcess";
import { ProductionOrderPlannedCuttingProcess } from "../../../ProductionOrderCuttingProcess/domain/entities/ProductionOrderPlannedCuttingProcess";
import { ProductionOrderNotPlannedSewingProcessDTO } from "../../../ProductionOrderSewingProcess/domain/data-transfer-objects/ProductionOrderNotPlannedSewingProcessDTO";
import { ProductionOrderPlannedSewingProcessDTO } from "../../../ProductionOrderSewingProcess/domain/data-transfer-objects/ProductionOrderPlannedSewingProcessDTO";
import { ProductionOrderNotPlannedSewingProcess } from "../../../ProductionOrderSewingProcess/domain/entities/ProductionOrderNotPlannedSewingProcess";
import { ProductionOrderPlannedSewingProcess } from "../../../ProductionOrderSewingProcess/domain/entities/ProductionOrderPlannedSewingProcess";
import { ProductionModuleId } from "../../../ProductionOrderSewingProcess/domain/value-objects/ProductionModuleId";
import { ProductionOrderProcessId } from "../../../Shared/domain/value-objects/ProductionOrderProcessId";
import { ProductionOrderType } from "../../../Shared/domain/value-objects/ProductionOrderType";
import { ProductionOrderDTO } from "../data-transfer-object/ProductionOrderDTO";
import { ProductionOrderGarmentType } from "../value-objects/ProductionOrderGarmentType";
import { ProductionOrderProccessState } from "../value-objects/ProductionOrderProccessState";

export class ProductionOrder {
    readonly productionOrderId: ProductionOrderId;
    readonly reference: ReferenceId;
    readonly garmentType: ProductionOrderGarmentType;
    readonly plannedAmount: ProductionOrderPlannedAmount;
    readonly creationDate: CreationDate;
    readonly state: ProductionOrderProccessState;

    private _processStartDate: ProductionOrderProcessStartDate | null;
    private _processEndDate: ProductionOrderProcessEndDate | null;
    private _processStartDatePlanned: ProductionOrderProcessStartDatePlanned | null;
    private _processEndDatePlanned: ProductionOrderProcessEndDatePlanned | null;

    private _sewingProcess: ProductionOrderNotPlannedSewingProcess | ProductionOrderPlannedSewingProcess;
    private _cuttingProcess: ProductionOrderNotPlannedCuttingProcess | ProductionOrderPlannedCuttingProcess;

    private _administrativeEventList: CommonModificationEvent[] = [];

    constructor(
        productionOrderId: ProductionOrderId,
        reference: ReferenceId,
        garmentType: ProductionOrderGarmentType,
        plannedAmount: ProductionOrderPlannedAmount,
        creationDate: CreationDate,
        state: ProductionOrderProccessState,
        sewingProcess: ProductionOrderNotPlannedSewingProcess | ProductionOrderPlannedSewingProcess,
        cuttingProcess: ProductionOrderNotPlannedCuttingProcess | ProductionOrderPlannedCuttingProcess
    ) {
        this.state = state;
        this.reference = reference;
        this.garmentType = garmentType;
        this.creationDate = creationDate;
        this.plannedAmount = plannedAmount;
        this.productionOrderId = productionOrderId;
        this._processEndDate = null;
        this._processStartDate = null;
        this._processEndDatePlanned = null;
        this._processStartDatePlanned = null;
        this._sewingProcess = sewingProcess;
        this._cuttingProcess = cuttingProcess;
    }

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

    public get administrativeEventList(): CommonModificationEvent[] {
        return this._administrativeEventList;
    }

    public get sewingProcess(): ProductionOrderNotPlannedSewingProcess | ProductionOrderPlannedSewingProcess {
        return this._sewingProcess;
    }

    public get cuttingProcess(): ProductionOrderNotPlannedCuttingProcess | ProductionOrderPlannedCuttingProcess {
        return this._cuttingProcess;
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
        state: ProductionOrderProccessState,
        sewingProcess: ProductionOrderNotPlannedSewingProcess | ProductionOrderPlannedSewingProcess,
        cuttingProcess: ProductionOrderNotPlannedCuttingProcess | ProductionOrderPlannedCuttingProcess
    ): ProductionOrder {
        return new ProductionOrder(
            productionOrderId,
            reference,
            garmentType,
            plannedAmount,
            creationDate,
            state,
            sewingProcess,
            cuttingProcess
        )
    }

    plannedProductionOrder(processStartDate: ProductionOrderProcessStartDate, processEndDate: ProductionOrderProcessEndDate) {
        this._processStartDatePlanned = processStartDate;
        this._processEndDatePlanned = processEndDate;
    }

    plannedSewingProccess(
        productionOrderType: ProductionOrderType,
        plannedProductionModuleId: ProductionModuleId,
        plannedStartDate: ProductionOrderProcessStartDatePlanned,
        plannedEndDate: ProductionOrderProcessEndDatePlanned
    ) {
        const sewingProcess = new ProductionOrderNotPlannedSewingProcess(
            this.productionOrderId,
            new ProductionOrderProcessId(4),
            productionOrderType,
            new ProductionOrderExecutedAmount(0),
            null,
            null
        );

        sewingProcess.plannedProccess(plannedStartDate, plannedEndDate, plannedProductionModuleId)
        this._sewingProcess = sewingProcess;
    }

    plannedCuttingProccess(productionOrderType: ProductionOrderType, plannedStartDate: ProductionOrderProcessStartDatePlanned, plannedEndDate: ProductionOrderProcessEndDatePlanned) {

        const cuttingProcess = new ProductionOrderNotPlannedCuttingProcess(
            this.productionOrderId,
            new ProductionOrderProcessId(3),
            productionOrderType,
            new ProductionOrderExecutedAmount(0),
            null,
            null
        );

        cuttingProcess.plannedProccess(plannedStartDate, plannedEndDate,)
        this._cuttingProcess = cuttingProcess;
    }

    fromPrimitives(data: ProductionOrderDTO): ProductionOrder {
        return new ProductionOrder(
            new ProductionOrderId(data.productionOrderId),
            new ReferenceId(data.reference),
            new ProductionOrderGarmentType(data.garmentType),
            new ProductionOrderPlannedAmount(data.plannedAmount),
            new CreationDate(data.creationDate),
            new ProductionOrderProccessState(data.state),
            data.sewingProcess.className === 'ProductionOrder.NotPlannedSewingProcessDTO' ?
                ProductionOrderNotPlannedSewingProcess.fromPrimitives(data.sewingProcess as ProductionOrderNotPlannedSewingProcessDTO) :
                ProductionOrderPlannedSewingProcess.fromPrimitives(data.sewingProcess as ProductionOrderPlannedSewingProcessDTO),
            data.cuttingProcess.className === 'ProductionOrder.NotPlannedCuttingProcessDTO' ?
                ProductionOrderNotPlannedCuttingProcess.fromPrimitives(data.cuttingProcess as ProductionOrderNotPlannedCuttingProcessDTO) :
                ProductionOrderPlannedCuttingProcess.fromPrimitives(data.cuttingProcess as ProductionOrderPlannedCuttingProcessDTO)
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
            this.sewingProcess.toPrimitives(),
            this.cuttingProcess.toPrimitives()
        )
    }
}