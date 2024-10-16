import { MenuContainerForOperationsDTO } from "./MenuContainerForOperationsDTO";

export class MenuContainerForMenusDTO {
    private _className: string = 'menuContainer.forMenusDTO'
    constructor(
        readonly id: number,
        readonly masterId: number| null,
        readonly label: string,
        readonly state: boolean,
        readonly children: (MenuContainerForMenusDTO | MenuContainerForOperationsDTO)[]
    ) { }
    public get className(): string {
        return this._className;
    }
}