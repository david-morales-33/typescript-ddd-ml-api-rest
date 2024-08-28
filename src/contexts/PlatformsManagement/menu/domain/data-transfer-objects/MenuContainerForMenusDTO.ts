import { MenuContainerForOperationsDTO } from "./MenuContainerForOperationsDTO";

export class MenuContainerForMenusDTO {
    private _className: string = 'menuContainer.forMenusDTO'
    constructor(
        readonly id: number,
        readonly name: string,
        readonly state: boolean,
        readonly children: (MenuContainerForMenusDTO | MenuContainerForOperationsDTO)[]
    ) { }
    public get className(): string {
        return this._className;
    }
}