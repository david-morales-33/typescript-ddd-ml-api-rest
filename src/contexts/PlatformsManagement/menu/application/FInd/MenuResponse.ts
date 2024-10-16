import { OperationResponse } from "../../../Operation/application/Search/OperationResponse";
import { MenuContainerForMenusDTO } from "../../domain/data-transfer-objects/MenuContainerForMenusDTO";
import { MenuContainerForMenus } from "../../domain/entities/MenuContainerForMenus";

interface MenuForOperations {
    menuId: number,
    plataformaId: number,
    perfilId: number,
    item: string,
    estado: boolean,
    childrens: OperationResponse[]
}
interface MenuForMenus {
    menuId: number,
    plataformaId: number,
    perfilId: number,
    item: string,
    estado: boolean,
    childrens: (MenuForMenus | MenuForOperations)[]
}


export class MenusResponse {
    public readonly menu: MenuContainerForMenusDTO;
    constructor(menu: MenuContainerForMenus) {
        this.menu = menu.toPrimitives();
    }
}