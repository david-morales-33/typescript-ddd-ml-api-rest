export class ProductionOrderPlannedSewingProcessDTO {
    private _className: string = 'ProductionOrder.PlannedSewingProcessDTO';
    constructor(
        public readonly productionOrderId: string,
        public readonly proccessId: number,
        public readonly productionOrderType: string,
        public readonly executedAmount: number,
        public readonly plannedProductionModuleId: number,
        public readonly plannedStartDate: Date,
        public readonly plannedEndDate: Date,
        public readonly executedStartDate: Date | null,
        public readonly executedEndDate: Date | null,
    ) { }
    public get className(): string {
        return this._className;
    }
}