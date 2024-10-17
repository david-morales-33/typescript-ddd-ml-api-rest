
export class ProductionModuleAnomalyViewDTO {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly state: boolean,
        public readonly creationDate: string,
        public readonly createBy: string,
    ) { }
}