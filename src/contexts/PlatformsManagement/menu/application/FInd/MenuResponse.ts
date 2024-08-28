import { MenuContainerForMenusDTO } from "../../domain/data-transfer-objects/MenuContainerForMenusDTO";
import { MenuContainerForMenus } from "../../domain/entities/MenuContainerForMenus";

export class MenuResponse {
    public readonly menu: MenuContainerForMenusDTO;

    constructor(menu: MenuContainerForMenus) {
        this.menu = menu.toPrimitives();
    }
}