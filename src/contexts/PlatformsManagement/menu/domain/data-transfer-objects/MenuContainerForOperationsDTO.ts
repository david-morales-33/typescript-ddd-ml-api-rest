import { OperationDTO } from "../../../Operation/domain/data-transfer-objects/OperationDTO";

export class MenuContainerForOperationsDTO {
    private _className: string = 'menuContainer.forOperationsDTO'
    constructor(
        readonly id: number,
        readonly name: string,
        readonly state: boolean,
        readonly children: OperationDTO[]
    ) { }
    public get className(): string {
        return this._className;
    }
}