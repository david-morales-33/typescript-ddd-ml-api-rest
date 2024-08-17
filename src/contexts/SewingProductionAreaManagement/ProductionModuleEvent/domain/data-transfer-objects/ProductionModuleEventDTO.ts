
export class ProductionModuleEventDTO {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly description: string,
        readonly value: string,
        readonly creationDate: Date
    ) { }
}