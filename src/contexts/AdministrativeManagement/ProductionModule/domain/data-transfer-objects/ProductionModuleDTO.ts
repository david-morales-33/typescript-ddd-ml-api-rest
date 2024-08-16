import { CommonCreationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO";

export class ProductionModuleDTO {

    private _className: string = 'ProductionModule.DTO'

    constructor(
        readonly id: number,
        readonly label: string,
        readonly machineAmount: number,
        readonly currentOperationState: boolean,
        readonly currentSupervisorId: string | null,
        readonly currentSewingWorkerCounter: number,
        readonly currentSewingWorkerIdList: string[],
        readonly state: boolean,
        readonly creationDate: Date,
        readonly createBy: string,
        readonly administrativeEventList: (CommonCreationEventDTO | CommonModificationEventDTO)[]
    ) { }

    public get className(): string {
        return this._className;
    }
}