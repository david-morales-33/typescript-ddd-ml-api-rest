
export class ProductionModuleDTO {

    private _className: string = 'ProductionModule.DTO'

    constructor(
        readonly id: number,
        readonly currentReference: string,
        readonly currentProductionOrder: string,
        readonly currentGarmentSize: string,
        readonly currentColorId: string,
        readonly currentSupervisorId: string,
        readonly currentState: boolean,
        readonly currentSewingWorkerCounter: number,
        readonly currentSewingWorkerIdList: string[]
    ) { }

    public get className(): string {
        return this._className;
    }
}