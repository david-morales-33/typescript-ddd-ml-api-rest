import { MenuContainerForMenusDTO } from "../data-transfer-objects/MenuContainerForMenusDTO";
import { MenuContainerForOperationsDTO } from "../data-transfer-objects/MenuContainerForOperationsDTO";
import { MenuId } from "../value-objects/MenuId";
import { MenuName } from "../value-objects/MenuName";
import { MenuState } from "../value-objects/MenuState";
import { MenuContainerForOperations } from "./MenuContainerForOperations";
import { MenuRoot } from '../interfaces/menuRoot'

export class MenuContainerForMenus implements MenuRoot {
    constructor(
        readonly id: MenuId,
        readonly masterId: MenuId | null,
        readonly label: MenuName,
        readonly state: MenuState,
        readonly children: (MenuContainerForMenus | MenuContainerForOperations)[]
    ) { }

    static create(
        id: MenuId,
        masterId: MenuId | null,
        label: MenuName,
        state: MenuState,
        children: MenuContainerForMenus[]
    ): MenuContainerForMenus {
        return new MenuContainerForMenus(
            id,
            masterId,
            label,
            state,
            children
        )
    }

    static fromPrimitives(data: MenuContainerForMenusDTO): MenuContainerForMenus {
        return new MenuContainerForMenus(
            new MenuId(data.id),
            data.masterId === null ? null : new MenuId(data.masterId),
            new MenuName(data.label),
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
            this.masterId === null ? null : this.masterId.value,
            this.label.value,
            this.state.value,
            this.children.map(entry => entry.toPrimitives())
        )
    }
}

