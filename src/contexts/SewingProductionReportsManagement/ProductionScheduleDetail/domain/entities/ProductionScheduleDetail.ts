import { ProductionScheduleDetailRoot } from '../interfaces/ProductionScheduleDetailRoot'
import { ProductionScheduleDetailId } from '../value-objects/ProductionScheduleDetailId';
import { ProductionScheduleDetailSchedule } from '../value-objects/ProductionScheduleDetailSchedule'
import { ProductionScheduleDetailPlannedAmount } from '../value-objects/ProductionScheduleDetailPlannedAmount';
import { ProductionScheduleDetailPlannedAmountAccumulated } from '../value-objects/ProductionScheduleDetailPlannedAmountAccumulated';
import { ProductionScheduleDetailCurrentAmount } from '../value-objects/ProductionScheduleDetailCurrentAmount'
import { ProductionScheduleDetailCurrentAccumulateAmount } from '../value-objects/ProductionScheduleDetailCurrentAccumulateAmount'
import { ProductionScheduleDetailCurrentPercentageAmount } from '../value-objects/ProductionScheduleDetailCurrentPercentageAmount'
import { ProductionScheduleDetailAccumulatedPercentageAmount } from '../value-objects/ProductionScheduleDetailAccumulatedPercentageAmount'
import { ProductionScheduleDetailDTO } from '../data-transfer-objects/ProductionScheduleDetailDTO';

export class ProductionScheduleDetail implements ProductionScheduleDetailRoot {
    readonly id: ProductionScheduleDetailId;
    readonly schedule: ProductionScheduleDetailSchedule;
    readonly plannedAmount: ProductionScheduleDetailPlannedAmount;
    readonly currentAmount: ProductionScheduleDetailCurrentAmount;
    private _plannedAmountAccumulated: ProductionScheduleDetailPlannedAmountAccumulated;
    private _currentAmountAccumulated: ProductionScheduleDetailCurrentAccumulateAmount;
    private _currentPercentageAmount: ProductionScheduleDetailCurrentPercentageAmount;
    private _accumulatedPercentageAmount: ProductionScheduleDetailAccumulatedPercentageAmount;

    constructor(
        id: ProductionScheduleDetailId,
        schedule: ProductionScheduleDetailSchedule,
        plannedAmount: ProductionScheduleDetailPlannedAmount,
        currentAmount: ProductionScheduleDetailCurrentAmount,
    ) {
        this.id = id;
        this.schedule = schedule;
        this.plannedAmount = plannedAmount;
        this.currentAmount = currentAmount;
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
        return new ProductionScheduleDetailPlannedAmountAccumulated(this.plannedAmount.value)
    }

    private calculateCurrentAmountAccumulated(): ProductionScheduleDetailCurrentAccumulateAmount {
        return new ProductionScheduleDetailCurrentAccumulateAmount(this.currentAmount.value);
    }

    private calculateCurrentPercentage(): ProductionScheduleDetailCurrentPercentageAmount {
        return new ProductionScheduleDetailCurrentPercentageAmount((this.plannedAmount.value / this.currentAmount.value) * 100)
    }

    private calculatePlannedPercentage(): ProductionScheduleDetailAccumulatedPercentageAmount {
        return new ProductionScheduleDetailAccumulatedPercentageAmount((this.plannedAmountAccumulated.value / this.currentAmountAccumulated.value) * 100)
    }

    static fromPrimitives(data: ProductionScheduleDetailDTO): ProductionScheduleDetail {
        return new ProductionScheduleDetail(
            new ProductionScheduleDetailId(data.id),
            new ProductionScheduleDetailSchedule(data.schedule),
            new ProductionScheduleDetailPlannedAmount(data.plannedAmount),
            new ProductionScheduleDetailCurrentAmount(data.currentAmount),
        )
    }

    toPrimitives(): ProductionScheduleDetailDTO {
        return new ProductionScheduleDetailDTO(
            this.id.value,
            this.schedule.value,
            this.plannedAmount.value,
            this.currentAmount.value,
            this.plannedAmountAccumulated.value,
            this.currentAmountAccumulated.value,
            this.currentPercentageAmount.value,
            this.accumulatedPercentageAmount.value
        )
    }
}