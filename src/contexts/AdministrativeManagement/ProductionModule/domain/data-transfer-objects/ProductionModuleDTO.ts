import { CommonCreationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO";

export class ProductionModuleDTO {

    private _className: string = 'ProductionModule.DTO'

    constructor(
        readonly id: number,
        readonly currentReference: string,
        readonly currentProductionOrder: string,
        readonly currentGarmentSize: string,
        readonly currentColorId: string,
        readonly currentSupervisorId: string,
        readonly currentState: boolean,
        readonly currentSewingWorkerCounter: number,
        readonly currentSewingWorkerIdList: string[],
        readonly creationDate: Date,
        readonly createBy: string,
        readonly administrativeEventList: (CommonCreationEventDTO | CommonModificationEventDTO)[]
    ) { }

    public get className(): string {
        return this._className;
    }
}