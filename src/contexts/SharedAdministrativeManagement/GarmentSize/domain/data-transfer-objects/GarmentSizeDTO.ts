import { CommonCreationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../../Shared/domain/data-transfer-object/CommonModificationEventDTO";

export class GarmentSizeDTO {
    private _className: string = 'GarmentSize.DTO'
    constructor(
        readonly id: number,
        readonly label: string,
        readonly garmentType: any,
        readonly order: number,
        readonly state: boolean,
        readonly administrativeEventList: (CommonModificationEventDTO | CommonCreationEventDTO)[]
    ) { }

    public get className(): string {
        return this._className;
    }
}