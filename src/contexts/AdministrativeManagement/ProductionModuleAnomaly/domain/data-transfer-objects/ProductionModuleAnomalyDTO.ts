
export class ProductionModuleAnomalyDTO {

    private _className: string = 'ProductionModuleAnomaly.DTO';

    constructor(
        readonly id: string,
        readonly name: string,
        readonly state: boolean
    ) { }

    public get className(): string {
        return this._className;
    }
}