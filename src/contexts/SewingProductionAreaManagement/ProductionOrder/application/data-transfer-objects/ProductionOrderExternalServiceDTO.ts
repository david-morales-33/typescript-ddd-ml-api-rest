import { ServiceResponse } from "../../../../Shared/infrastructure/services/WebService/ServiceResponse";

export class ProductionOrderExternalServiceDTO implements ServiceResponse {

    private _className: string = 'ProductionOrderExternalService.DTO';

    constructor(
        readonly op: string,
        readonly reference: string,
        readonly colorId: string,
        readonly colorLabel: string,
        readonly garmentSize: string,
        readonly plannedAmount: number,
        readonly completedAmount: number,
        readonly executedAmount: number
    ) { }

    public get className(): string {
        return this._className;
    }
}