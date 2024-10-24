
export class ProductionOrderNotPlannedSewingProcessDTO {
    private _className: string = 'ProductionOrder.NotPlannedSewingProcessDTO';
    constructor(
        public readonly productionOrderId: string,
        public readonly proccessId: number,
        public readonly productionOrderType: string,
        public readonly executedAmount: number,
        public readonly plannedAmount: number,
        public readonly plannedProductionModuleId: number | null,
        public readonly executedStartDate: Date | null,
        public readonly executedEndDate: Date | null,
        public readonly plannedStartDate: Date | null,
        public readonly plannedEndDate: Date | null
    ) { }
    public get className(): string {
        return this._className;
    }
}