import { ProductionOrderRoot } from "../interfaces/ProductionOrderRoot";
import { ProductionOrderRecordsCounter } from "../value-objects/ProductionOrderRecordsCounter";
import { ProductionOrderRecordsCheckedCounter } from "../value-objects/ProductionOrderRecordsCheckedCounter";
import { ProductionOrderExecutedAmount } from "../value-objects/ProductionOrderExecutedAmount";
import { ProductionOrderProcessEndDate } from "../value-objects/ProductionOrderProcessEndDate";
import { ProductionOrderPlannedAmount } from "../value-objects/ProductionOrderPlannedAmount";
import { ProductionOrderProcessStartDate } from "../value-objects/ProductionOrderProcessStartDate";
import { ProductionOrderReference } from "../value-objects/ProductionOrderReference";
import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";
import { ProductionOrderDetailId } from "../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailId";
import { CountingRecordsOrderFirstQualityNotChecked } from "../../../CountingRecordsOrder/domain/entities/CountingRecordOrderFirstQualityNotChecked";
import { CountingRecordsOrderSecondQualityNotChecked } from "../../../CountingRecordsOrder/domain/entities/CountingRecordOrderSecondQualityNotChecked";
import { ProductionOrderDetailInProgress } from "../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailInProgress";
import { ProductionOrderDetailNotStarted } from "../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { ProductionOrderInProgressDTO } from "../data-transfer-objects/ProductionOrderInProgressDTO";
import { ProductionOrderDetailInProgressDTO } from "../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailInProgressDTO";
import { ProductionOrderDetailNotStartedDTO } from "../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailNotStartedDTO";
import { ProductionOrderDetailListEmptyException } from "../../exceptions/ProductionOrderDetailListEmptyException";
import { ProductionOrderDetailNotFoundException } from "../../exceptions/ProductionOrderDetailNotFoundException";
import { GarmentType } from "../../../Shared/domain/value-object/GarmentType";
import { ProductionModuleId } from "../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ReferenceId } from "../../../../Shared/domain/value-object/ReferenceId";

export class ProductionOrderInProgress implements ProductionOrderRoot {

    private _recordsOrderCounter: ProductionOrderRecordsCounter;
    private _recordsOrderCheckedCounter: ProductionOrderRecordsCheckedCounter;
    private _processEndDate: ProductionOrderProcessEndDate | null;
    private _plannedAmount: ProductionOrderPlannedAmount;
    private _executedAmount: ProductionOrderExecutedAmount;

    constructor(
        readonly productionOrderid: ProductionOrderId,
        readonly reference: ReferenceId,
        readonly garmentType: GarmentType,
        readonly productionModuleAsigned: ProductionModuleId,
        readonly processStartDate: ProductionOrderProcessStartDate,
        readonly openByUser: UserId,
        readonly productionOrderDetailList: (ProductionOrderDetailInProgress | ProductionOrderDetailNotStarted)[],
    ) {

        if (productionOrderDetailList.length === 0)
            throw new ProductionOrderDetailListEmptyException(this.productionOrderid)

        this._processEndDate = null;
        this._recordsOrderCheckedCounter = this.setInitialCountingRecordsOrderCheckedCounter(productionOrderDetailList);
        this._recordsOrderCounter = this.setInitialCountingRecordsOrderCounter(productionOrderDetailList);
        this._executedAmount = this.setInitialExecutedAmount(productionOrderDetailList);
        this._plannedAmount = this.setInitialPlannedAmount(productionOrderDetailList);
    }

    public get plannedAmount(): ProductionOrderPlannedAmount {
        return this._plannedAmount;
    }

    public get executedAmount(): ProductionOrderExecutedAmount {
        return this._executedAmount;
    }

    public get processEndDate(): ProductionOrderProcessEndDate | null {
        return this._processEndDate;
    }

    public get recordsOrderCounter(): ProductionOrderRecordsCounter {
        return this._recordsOrderCounter;
    }

    public get recordsOrderCheckedCounter(): ProductionOrderRecordsCheckedCounter {
        return this._recordsOrderCheckedCounter;
    }

    static create(
        productionOrderid: ProductionOrderId,
        reference: ReferenceId,
        garmentType: GarmentType,
        productionModuleAsigned: ProductionModuleId,
        processStartDate: ProductionOrderProcessStartDate,
        openByUser: UserId,
        productionOrderDetailList: ProductionOrderDetailInProgress[] | ProductionOrderDetailNotStarted[]
    ): ProductionOrderInProgress {

        return new ProductionOrderInProgress(
            productionOrderid,
            reference,
            garmentType,
            productionModuleAsigned,
            processStartDate,
            openByUser,
            productionOrderDetailList,
        );
    }

    addCountingRecordsOrder(countingRecordsOrder: CountingRecordsOrderFirstQualityNotChecked | CountingRecordsOrderSecondQualityNotChecked): void {

        const productionOrderDetailId = ProductionOrderDetailId.create(
            countingRecordsOrder.colorId,
            countingRecordsOrder.garmentSize,
            countingRecordsOrder.productionOrderId
        );

        const productionOrderDetail = this.productionOrderDetailList.find(element => element.productionOrderDetailId.getProductionOrderDetalId() === productionOrderDetailId.getProductionOrderDetalId());

        if (productionOrderDetail === undefined)
            throw new ProductionOrderDetailNotFoundException(productionOrderDetailId);

        productionOrderDetail.addCountingRecordOrder(countingRecordsOrder);
        this.incrementExecutedAmount(countingRecordsOrder.recordsAmount);
        this.incrementRecordsCounter();

        if (this.hasCompletedPlannedAmount())
            this.closeOrder();
    }

    addCountingRecordsOrderNotChecked(countingRecordsOrder: CountingRecordsOrderFirstQualityNotChecked | CountingRecordsOrderSecondQualityNotChecked): void {

        const productionOrderDetailId = ProductionOrderDetailId.create(
            countingRecordsOrder.colorId,
            countingRecordsOrder.garmentSize,
            countingRecordsOrder.productionOrderId
        );

        const productionOrderDetail = this.productionOrderDetailList.find(element => element.productionOrderDetailId.getProductionOrderDetalId() === productionOrderDetailId.getProductionOrderDetalId());

        if (productionOrderDetail === undefined)
            throw new ProductionOrderDetailNotFoundException(productionOrderDetailId);

        const productionOrderDetailInProgrees = productionOrderDetail as ProductionOrderDetailInProgress;
        productionOrderDetailInProgrees.checkCoutingRecordOrder(countingRecordsOrder.id);
    }

    incrementRecordsCounter(): void {
        this._recordsOrderCounter = this.recordsOrderCounter.increment();
    }

    incrementExecutedAmount(amount: CountingRecordsOrderAmount): void {
        this._executedAmount = this.executedAmount.increment(amount);
    }

    closeOrder(): void {
        this._processEndDate = new ProductionOrderProcessEndDate(new Date());
    }

    private hasCompletedPlannedAmount(): boolean {
        return this.plannedAmount.value <= this.executedAmount.value;
    }

    private setInitialCountingRecordsOrderCounter(productionOrderDetailList: (ProductionOrderDetailInProgress | ProductionOrderDetailNotStarted)[]): ProductionOrderRecordsCounter {
        const counterList = productionOrderDetailList.map(element => element.countingRecordsOrderListId.length);
        let counterAmount = 0;

        counterList.forEach(element => {
            counterAmount = counterAmount + element;
        });

        return new ProductionOrderRecordsCounter(counterAmount);
    }

    private setInitialCountingRecordsOrderCheckedCounter(productionOrderDetailList: (ProductionOrderDetailInProgress | ProductionOrderDetailNotStarted)[]): ProductionOrderRecordsCheckedCounter {
        let counterAmount = 0;

        productionOrderDetailList.forEach(element => {
            if (element.toPrimitives().className === 'ProductionOrderDetail.inProgressDTO') {
                const DetailinProgressDTO = element as ProductionOrderDetailInProgress;
                counterAmount = counterAmount + DetailinProgressDTO.countingRecordsOrderCheckedListId.length;
            }
        });

        return new ProductionOrderRecordsCheckedCounter(counterAmount);
    }

    private setInitialPlannedAmount(productionOrderDetailList: (ProductionOrderDetailInProgress | ProductionOrderDetailNotStarted)[]): ProductionOrderPlannedAmount {
        let plannedAmount = 0;
        productionOrderDetailList.forEach(element => {
            plannedAmount = plannedAmount + element.plannedAmount.value;
        });
        return new ProductionOrderPlannedAmount(plannedAmount);
    }

    private setInitialExecutedAmount(productionOrderDetailList: (ProductionOrderDetailInProgress | ProductionOrderDetailNotStarted)[]): ProductionOrderExecutedAmount {
        let executedAmount = 0;
        productionOrderDetailList.forEach(element => {
            executedAmount = executedAmount + element.executedAmount.value;
        });
        return new ProductionOrderExecutedAmount(executedAmount);
    }

    toPrimitives(): ProductionOrderInProgressDTO {
        return new ProductionOrderInProgressDTO(
            this.productionOrderid.value,
            this.reference.value,
            this.garmentType.value,
            this.productionModuleAsigned.value,
            this.plannedAmount.value,
            this.executedAmount.value,
            this.processStartDate.value,
            this.processEndDate ? this.processEndDate.value : null,
            this.recordsOrderCounter.value,
            this.recordsOrderCheckedCounter.value,
            this.openByUser.value,
            this.productionOrderDetailList.map(entry => { return entry.toPrimitives() }),
        )
    }

    static fromPrimitives(data: ProductionOrderInProgressDTO): ProductionOrderInProgress {
        return new ProductionOrderInProgress(
            new ProductionOrderId(data.productionOrderid),
            new ReferenceId(data.reference),
            new GarmentType(data.garmentType),
            new ProductionModuleId(data.productionModuleAsigned),
            new ProductionOrderProcessStartDate(data.processStartDate),
            new UserId(data.openByUser),
            data.productionOrderDetailList.map(entry => {
                if (entry.className === 'ProductionOrderDetail.inProgressDTO')
                    return ProductionOrderDetailInProgress.fromPrimitives(entry as ProductionOrderDetailInProgressDTO);
                return ProductionOrderDetailNotStarted.fromPrimitives(entry as ProductionOrderDetailNotStartedDTO)
            }),
        )
    }
}
