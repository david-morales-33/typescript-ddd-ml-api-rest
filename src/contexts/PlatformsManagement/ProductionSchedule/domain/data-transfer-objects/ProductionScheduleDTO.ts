
export class ProductionScheduleDTO {
    constructor(
        readonly id: number,
        readonly productionModuleId:number,
        readonly label: string,
        readonly state: boolean
    ){}
}