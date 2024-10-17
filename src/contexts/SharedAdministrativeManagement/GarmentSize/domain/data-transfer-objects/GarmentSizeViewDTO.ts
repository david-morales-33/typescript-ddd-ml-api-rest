export class GarmentSizeViewDTO{
    constructor(
        readonly tallaId: string,
        readonly tallaLabel: string,
        readonly tipo: string,
        readonly order: number,
        readonly estado: boolean
    ){}
}