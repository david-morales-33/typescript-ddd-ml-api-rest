
export class ProductionModuleViewDTO {

    constructor(
        public readonly productionModuleId: number,
        public readonly machineAmount: number,
        public readonly operationState: boolean,
        public readonly workersAmount: number,
        public readonly currentProductionOrder: string,
        public readonly currentReferences: string,
        public readonly currentGarmentSize: string,
        public readonly currentColor: string,
        public readonly currentEvent: string | null,
        public readonly currentRevisorId: string,
    ) { }

}