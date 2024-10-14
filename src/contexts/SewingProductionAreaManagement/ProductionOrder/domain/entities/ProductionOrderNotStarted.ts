import { ProductionOrderRoot } from "../interfaces/ProductionOrderRoot";
import { ProductionOrderRecordsCounter } from "../value-objects/ProductionOrderRecordsCounter";
import { ProductionOrderExecutedAmount } from "../value-objects/ProductionOrderExecutedAmount";
import { ProductionOrderId } from "../value-objects/ProductionOrderId";
import { ProductionOrderPlannedAmount } from "../value-objects/ProductionOrderPlannedAmount";
import { ProductionOrderProcessStartDate } from "../value-objects/ProductionOrderProcessStartDate";
import { ProductionOrderReference } from "../value-objects/ProductionOrderReference";
import { UserId } from "../../../User/domain/value-objects/UserId";
import { ProductionOrderDetailNotStarted } from "../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { ProductionOrderINotStartedDTO } from "../data-transfer-objects/ProductionOrderINotStartedDTO";
import { CountingRecordsOrderFirstQualityNotChecked } from "../../../CountingRecordsOrder/domain/entities/CountingRecordOrderFirstQualityNotChecked";
import { CountingRecordsOrderSecondQualityNotChecked } from "../../../CountingRecordsOrder/domain/entities/CountingRecordOrderSecondQualityNotChecked";
import { ProductionOrderDetailId } from "../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailId";
import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";
import { ProductionOrderDetailListEmptyException } from "../../exceptions/ProductionOrderDetailListEmptyException";
import { ProductionOrderDetailNotFoundException } from "../../exceptions/ProductionOrderDetailNotFoundException";
import { ProductionOrderDetailHasAlreadyBeenAddException } from "../../exceptions/ProductionOrderDetailHasAlreadyBeenAddException";
import { ProductionModuleId } from "../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { GarmentType } from "../../../Shared/domain/value-object/GarmentType";

export class ProductionOrderNotStarted implements ProductionOrderRoot {

    private _executedAmount: ProductionOrderExecutedAmount;
    private _plannedAmount: ProductionOrderPlannedAmount;
    private _processStartDate: ProductionOrderProcessStartDate | null;
    private _recordsOrderCounter: ProductionOrderRecordsCounter;

    constructor(
        readonly productionOrderid: ProductionOrderId,
        readonly reference: ProductionOrderReference,
        readonly garmentType: GarmentType,
        readonly productionModuleAsigned: ProductionModuleId,
        readonly openByUser: UserId,
        readonly productionOrderDetailList: ProductionOrderDetailNotStarted[]
    ) {
        if (productionOrderDetailList.length === 0)
            throw new ProductionOrderDetailListEmptyException(productionOrderid)

        this._processStartDate = null;
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

    public get recordsOrderCounter(): ProductionOrderRecordsCounter {
        return this._recordsOrderCounter;
    }

    public get processStartDate(): ProductionOrderProcessStartDate | null {
        return this._processStartDate
    }

    static create(
        productionOrderid: ProductionOrderId,
        reference: ProductionOrderReference,
        garmentType: GarmentType,
        productionModuleAsigned: ProductionModuleId,
        openByUser: UserId,
        productionOrderDetailList: ProductionOrderDetailNotStarted[]
    ): ProductionOrderNotStarted {

        return new ProductionOrderNotStarted(
            productionOrderid,
            reference,
            garmentType,
            productionModuleAsigned,
            openByUser,
            productionOrderDetailList
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

        productionOrderDetail.addCountingRecordOrder(countingRecordsOrder)
        this.incrementExecutedAmount(countingRecordsOrder.recordsAmount);
        this.incrementRecordsCounter();

        this.openOrder();
    }

    incrementRecordsCounter(): void {
        this._recordsOrderCounter = this.recordsOrderCounter.increment();
    }

    incrementExecutedAmount(amount: CountingRecordsOrderAmount): void {
        this._executedAmount = this.executedAmount.increment(amount);
    }

    addProductionOrderDetail(productionOrderDetail: ProductionOrderDetailNotStarted): void {
        if (this.hasAddedProductionOrderDetail(productionOrderDetail))
            throw new ProductionOrderDetailHasAlreadyBeenAddException(productionOrderDetail.productionOrderDetailId)

        this.productionOrderDetailList.push(productionOrderDetail);
    }

    openOrder(): void {
        this._processStartDate = new ProductionOrderProcessStartDate(new Date);
    }

    hasAddedProductionOrderDetail(productionOrderDetail: ProductionOrderDetailNotStarted): boolean {
        const findedProductionOrderDetail = this.productionOrderDetailList.find(element => element.toPrimitives().productionOrderDetailId === productionOrderDetail.toPrimitives().productionOrderDetailId);
        return findedProductionOrderDetail !== undefined;
    }

    private setInitialCountingRecordsOrderCounter(productionOrderDetailList: ProductionOrderDetailNotStarted[]): ProductionOrderRecordsCounter {
        const counterList = productionOrderDetailList.map(element => element.countingRecordsOrderListId.length);
        let counterAmount = 0;

        counterList.forEach(element => {
            counterAmount = counterAmount + element;
        });

        return new ProductionOrderRecordsCounter(counterAmount);
    }

    private setInitialPlannedAmount(productionOrderDetailList: ProductionOrderDetailNotStarted[]): ProductionOrderPlannedAmount {
        let plannedAmount = 0;
        productionOrderDetailList.forEach(element => {
            plannedAmount = plannedAmount + element.plannedAmount.value;
        });
        return new ProductionOrderPlannedAmount(plannedAmount);
    }

    private setInitialExecutedAmount(productionOrderDetailList: ProductionOrderDetailNotStarted[]): ProductionOrderExecutedAmount {
        let executedAmount = 0;
        productionOrderDetailList.forEach(element => {
            executedAmount = executedAmount + element.executedAmount.value;
        });
        return new ProductionOrderExecutedAmount(executedAmount);
    }

    static fromPrimitives(data: ProductionOrderINotStartedDTO) {
        return new ProductionOrderNotStarted(
            new ProductionOrderId(data.productionOrderid),
            new ProductionOrderReference(data.reference),
            new GarmentType(data.garmentType),
            new ProductionModuleId(data.productionModuleAsigned),
            new UserId(data.openByUser),
            data.productionOrderDetailList.map(entry => ProductionOrderDetailNotStarted.fromPrimitives(entry))
        )
    }

    toPrimitives(): ProductionOrderINotStartedDTO {
        return new ProductionOrderINotStartedDTO(
            this.productionOrderid.value,
            this.reference.value,
            this.garmentType.value,
            this.productionModuleAsigned.value,
            this.plannedAmount.value,
            this.executedAmount.value,
            this.processStartDate ? this.processStartDate.value : null,
            this.recordsOrderCounter.value,
            this.productionOrderDetailList.map(entry => { return entry.toPrimitives() }),
            this.openByUser.value
        )
    }
}