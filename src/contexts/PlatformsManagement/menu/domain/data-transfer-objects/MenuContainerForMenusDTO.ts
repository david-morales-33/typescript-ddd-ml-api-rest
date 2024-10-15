import { MenuContainerForOperationsDTO } from "./MenuContainerForOperationsDTO";

export class MenuContainerForMenusDTO {
    private _className: string = 'menuContainer.forMenusDTO'
    constructor(
        readonly id: number,
        readonly plataformaId: number,
        readonly profileId: number,
        readonly label:string,
        readonly state: boolean,
        readonly children: MenuContainerForMenusDTO[]
    ) { }
    public get className(): string {
        return this._className;
    }
}