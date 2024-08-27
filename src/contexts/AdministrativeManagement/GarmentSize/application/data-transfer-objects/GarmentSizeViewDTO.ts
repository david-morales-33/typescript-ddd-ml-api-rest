export class GarmentSizeViewDTO{
    constructor(
        readonly tallaId: number,
        readonly tallaLabel: string,
        readonly tipo: string,
        readonly order: number,
        readonly estado: boolean
    ){}
}