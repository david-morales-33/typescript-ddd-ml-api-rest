import { MenuContainerForMenusDTO } from "../data-transfer-objects/MenuContainerForMenusDTO";
import { MenuContainerForOperationsDTO } from "../data-transfer-objects/MenuContainerForOperationsDTO";
import { MenuId } from "../value-objects/MenuId";
import { MenuName } from "../value-objects/MenuName";
import { MenuState } from "../value-objects/MenuState";
import { MenuContainerForOperations } from "./MenuContainerForOperations";
import {MenuRoot} from '../interfaces/MenuRoot'

export class MenuContainerForMenus implements MenuRoot {
    constructor(
        readonly id: MenuId,
        readonly name: MenuName,
        readonly state: MenuState,
        readonly children: (MenuContainerForMenus | MenuContainerForOperations)[]
    ) { }

    static create(id: MenuId, name: MenuName, state: MenuState, children: (MenuContainerForMenus | MenuContainerForOperations)[]): MenuContainerForMenus {
        return new MenuContainerForMenus(id, name, state, children);
    }

    static fromPrimitives(data: MenuContainerForMenusDTO): MenuContainerForMenus {
        return new MenuContainerForMenus(
            new MenuId(data.id),
            new MenuName(data.name),
            new MenuState(data.state),
            data.children.map(entry => {
                if (entry.className === 'menuContainer.forMenusDTO')
                    return MenuContainerForMenus.fromPrimitives(entry as MenuContainerForMenusDTO)
                return MenuContainerForOperations.fromPrimitives(entry as MenuContainerForOperationsDTO)
            })
        )
    }

    toPrimitives(): MenuContainerForMenusDTO {
        return new MenuContainerForMenusDTO(
            this.id.value,
            this.name.value,
            this.state.value,
            this.children.map(entry => { return entry.toPrimitives() })
        )
    }
}

