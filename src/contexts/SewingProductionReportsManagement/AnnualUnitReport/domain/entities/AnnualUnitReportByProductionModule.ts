import { AnnualUnitReportRoot } from '../interfaces/AnnualUnitReportRoot';
import { AnnualUnitReportId } from '../value-objects/AnnualUnitReportId';
import { AnnualUnitReportAmount } from '../value-objects/AnnualUnitReportAmount';
import { AnnualUnitReportReference } from '../value-objects/AnnualUnitReportReference';
import { AnnualUnitReportProductionOrderType } from '../value-objects/AnnualUnitReportProductionOrderId';
import { AnnualUnitReportYear } from '../value-objects/AnnualUnitReportYear';
import { AnnualUnitReportProductionModule } from '../value-objects/AnnualUnitReportProductionModule';
import { AnnualUnitReportByProductionModuleDTO } from '../data-transfer-objects/AnnualUnitReportByProductionModuleDTO';

export class AnnualUnitReportByProductionModule implements AnnualUnitReportRoot {
    constructor(
        readonly id: AnnualUnitReportId,
        readonly amount: AnnualUnitReportAmount,
        readonly reference: AnnualUnitReportReference,
        readonly productionModule: AnnualUnitReportProductionModule,
        readonly productionOrderType: AnnualUnitReportProductionOrderType,
        readonly year: AnnualUnitReportYear
    ) { }

    static create(
        id: AnnualUnitReportId,
        amount: AnnualUnitReportAmount,
        reference: AnnualUnitReportReference,
        productionModule: AnnualUnitReportProductionModule,
        productionOrderType: AnnualUnitReportProductionOrderType,
        year: AnnualUnitReportYear
    ): AnnualUnitReportByProductionModule {
        return new AnnualUnitReportByProductionModule(id, amount, reference, productionModule,productionOrderType, year);
    }

    static fromPrimitives(data: AnnualUnitReportByProductionModuleDTO): AnnualUnitReportByProductionModule{
        return new AnnualUnitReportByProductionModule(
            new AnnualUnitReportId(data.id),
            new AnnualUnitReportAmount(data.amount),
            new AnnualUnitReportReference(data.reference),
            new AnnualUnitReportProductionModule(data.productionModule),
            new AnnualUnitReportProductionOrderType(data.productionOrderType),
            new AnnualUnitReportYear(data.year)
        )
    }

    toPrimitives(): AnnualUnitReportByProductionModuleDTO {
        return new AnnualUnitReportByProductionModuleDTO(
            this.id.value,
            this.amount.value,
            this.reference.value,
            this.productionModule.value,
            this.productionOrderType.value,
            this.year.value
        )
    }
}