
export class ProductionModuleDTO {
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
}