
export class ProductionOrderNotPlannedCuttingProcessDTO {
    private _className: string = 'ProductionOrder.NotPlannedCuttingProcessDTO';
    constructor(
        public readonly productionOrderId: string,
        public readonly proccessId: number,
        public readonly productionOrderType: string,
        public readonly executedAmount: number,
        public readonly executedStartDate: Date | null,
        public readonly executedEndDate: Date | null,
        public readonly plannedStartDate: Date | null,
        public readonly plannedEndDate: Date | null
    ) { }
    public get className(): string {
        return this._className;
    }
}