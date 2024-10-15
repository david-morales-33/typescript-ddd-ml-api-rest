import { OperationResponse } from "../../../Operation/application/Search/OperationResponse";
import { MenuContainerForMenusDTO } from "../../domain/data-transfer-objects/MenuContainerForMenusDTO";
import { MenuContainerForMenus } from "../../domain/entities/MenuContainerForMenus";

interface MenuResponse {
    menuId: number,
    plataformaId: number,
    perfilId: number,
    item: string,
    state: boolean,
    childrens: MenuResponse[] | OperationResponse[]
}

export class MenusResponse {
    public readonly menu: MenuContainerForMenusDTO;

    constructor(menu: MenuContainerForMenus) {
        this.menu = menu.toPrimitives();
    }
}