
export class ProductionModuleEventDTO {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly state: boolean
    ) { }
}