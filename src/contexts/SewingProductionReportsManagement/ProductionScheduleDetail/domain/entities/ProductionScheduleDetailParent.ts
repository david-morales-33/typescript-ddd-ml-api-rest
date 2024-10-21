import { ProductionScheduleDetailRoot } from '../interfaces/ProductionScheduleDetailRoot'
import { ProductionScheduleDetailId } from '../value-objects/ProductionScheduleDetailId';
import { ProductionScheduleDetailSchedule } from '../value-objects/ProductionScheduleDetailSchedule'
import { ProductionScheduleDetailPlannedAmount } from '../value-objects/ProductionScheduleDetailPlannedAmount';
import { ProductionScheduleDetailPlannedAmountAccumulated } from '../value-objects/ProductionScheduleDetailPlannedAmountAccumulated';
import { ProductionScheduleDetailCurrentAmount } from '../value-objects/ProductionScheduleDetailCurrentAmount'
import { ProductionScheduleDetailCurrentAccumulateAmount } from '../value-objects/ProductionScheduleDetailCurrentAccumulateAmount'
import { ProductionScheduleDetailCurrentPercentageAmount } from '../value-objects/ProductionScheduleDetailCurrentPercentageAmount'
import { ProductionScheduleDetailAccumulatedPercentageAmount } from '../value-objects/ProductionScheduleDetailAccumulatedPercentageAmount'
import { ProductionScheduleDetail } from './ProductionScheduleDetail';
import { ProductionScheduleDetailParantsDTO } from '../data-transfer-objects/ProductionScheduleDetailParantsDTO'
import { ProductionScheduleDetailDTO } from '../data-transfer-objects/ProductionScheduleDetailDTO'

export class ProductionScheduleDetailParent implements ProductionScheduleDetailRoot {

    readonly id: ProductionScheduleDetailId;
    readonly schedule: ProductionScheduleDetailSchedule;
    readonly plannedAmount: ProductionScheduleDetailPlannedAmount;
    readonly currentAmount: ProductionScheduleDetailCurrentAmount;
    readonly productionScheduleChild: ProductionScheduleDetailParent | ProductionScheduleDetail;
    private _plannedAmountAccumulated: ProductionScheduleDetailPlannedAmountAccumulated;
    private _currentAmountAccumulated: ProductionScheduleDetailCurrentAccumulateAmount;
    private _currentPercentageAmount: ProductionScheduleDetailCurrentPercentageAmount;
    private _accumulatedPercentageAmount: ProductionScheduleDetailAccumulatedPercentageAmount;

    constructor(
        id: ProductionScheduleDetailId,
        schedule: ProductionScheduleDetailSchedule,
        plannedAmount: ProductionScheduleDetailPlannedAmount,
        currentAmount: ProductionScheduleDetailCurrentAmount,
        productionScheduleChild: ProductionScheduleDetailParent | ProductionScheduleDetail,
    ) {
        this.id = id;
        this.schedule = schedule;
        this.plannedAmount = plannedAmount;
        this.currentAmount = currentAmount;
        this.productionScheduleChild = productionScheduleChild;
        this._plannedAmountAccumulated = this.calculateAccumulatedPlannedAmount();
        this._currentAmountAccumulated = this.calculateCurrentAmountAccumulated();
        this._currentPercentageAmount = this.calculateCurrentPercentage();
        this._accumulatedPercentageAmount = this.calculatePlannedPercentage();
    }

    public get plannedAmountAccumulated(): ProductionScheduleDetailPlannedAmountAccumulated {
        return this._plannedAmountAccumulated;
    }

    public get currentAmountAccumulated(): ProductionScheduleDetailCurrentAccumulateAmount {
        return this._currentAmountAccumulated;
    }

    public get accumulatedPercentageAmount(): ProductionScheduleDetailAccumulatedPercentageAmount {
        return this._accumulatedPercentageAmount;
    }

    public get currentPercentageAmount(): ProductionScheduleDetailCurrentPercentageAmount {
        return this._currentPercentageAmount;
    }

    private calculateAccumulatedPlannedAmount(): ProductionScheduleDetailPlannedAmountAccumulated {
        const previusAccumulatedAmount = this.productionScheduleChild.plannedAmountAccumulated.value;
        return new ProductionScheduleDetailPlannedAmountAccumulated(previusAccumulatedAmount + this.plannedAmount.value)
    }

    private calculateCurrentAmountAccumulated(): ProductionScheduleDetailCurrentAccumulateAmount {
        const previusAccumulatedAmount = this.productionScheduleChild.currentAmountAccumulated.value;
        return new ProductionScheduleDetailCurrentAccumulateAmount(previusAccumulatedAmount + this.currentAmount.value);
    }

    private calculateCurrentPercentage(): ProductionScheduleDetailCurrentPercentageAmount {
        return new ProductionScheduleDetailCurrentPercentageAmount((this.plannedAmount.value / this.currentAmount.value) * 100)
    }

    private calculatePlannedPercentage(): ProductionScheduleDetailAccumulatedPercentageAmount {
        return new ProductionScheduleDetailAccumulatedPercentageAmount((this.plannedAmountAccumulated.value / this.currentAmountAccumulated.value) * 100)
    }

    static create(
        id: ProductionScheduleDetailId,
        schedule: ProductionScheduleDetailSchedule,
        plannedAmount: ProductionScheduleDetailPlannedAmount,
        currentAmount: ProductionScheduleDetailCurrentAmount,
        productionScheduleChild: ProductionScheduleDetailParent | ProductionScheduleDetail
    ): ProductionScheduleDetailParent {
        return new ProductionScheduleDetailParent(
            id,
            schedule,
            plannedAmount,
            currentAmount,
            productionScheduleChild
        );
    }

    static fromPrimitives(data: ProductionScheduleDetailParantsDTO): ProductionScheduleDetailParent {
        return new ProductionScheduleDetailParent(
            new ProductionScheduleDetailId(data.id),
            new ProductionScheduleDetailSchedule(data.schedule),
            new ProductionScheduleDetailPlannedAmount(data.plannedAmount),
            new ProductionScheduleDetailCurrentAmount(data.currentAmount),
            data.productionScheduleChild.className === 'productionScheduleDetail.DTO' ?
                ProductionScheduleDetail.fromPrimitives(data.productionScheduleChild as ProductionScheduleDetailDTO) :
                ProductionScheduleDetailParent.fromPrimitives(data.productionScheduleChild as ProductionScheduleDetailParantsDTO)
        )
    }

    toPrimitives(): ProductionScheduleDetailParantsDTO {
        return new ProductionScheduleDetailParantsDTO(
            this.id.value,
            this.schedule.value,
            this.plannedAmount.value,
            this.currentAmount.value,
            this.productionScheduleChild.toPrimitives(),
            this.plannedAmountAccumulated.value,
            this.currentAmountAccumulated.value,
            this.currentPercentageAmount.value,
            this.accumulatedPercentageAmount.value
        )
    }
}