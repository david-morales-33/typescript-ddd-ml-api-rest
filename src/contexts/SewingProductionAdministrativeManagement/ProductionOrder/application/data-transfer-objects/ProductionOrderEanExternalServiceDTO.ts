
export class ProductionOrderEanExternalServiceDTO {

    private _className: string = 'ProductionOrderEanExternalService.DTO'

    constructor(
        readonly ean: string,
        readonly reference: string,
        readonly colorId: string,
        readonly garmentSize: string
    ) { }

    public get className(): string {
        return this._className;
    }
}