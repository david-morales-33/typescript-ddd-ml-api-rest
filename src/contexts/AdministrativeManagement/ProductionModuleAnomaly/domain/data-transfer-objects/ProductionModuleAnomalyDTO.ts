import { CommonCreationEventDTO } from "../../../../Shared/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../../Shared/data-transfer-object/CommonModificationEventDTO";

export class ProductionModuleAnomalyDTO {

    private _className: string = 'ProductionModuleAnomaly.DTO';

    constructor(
        readonly id: string,
        readonly name: string,
        readonly state: boolean,
        readonly eventList: (CommonCreationEventDTO | CommonModificationEventDTO)[]
    ) { }

    public get className(): string {
        return this._className;
    }
}