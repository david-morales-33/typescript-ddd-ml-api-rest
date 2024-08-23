import { CommonCreationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO";

export class ColorDTO {
    private _className: string = 'color.DTO';

    constructor(
        readonly id: string,
        readonly label: string,
        readonly state: boolean,
        readonly administrativeEventList: (CommonModificationEventDTO | CommonCreationEventDTO)[] 
    ) { }

    public get className(): string {
        return this._className
    }
}