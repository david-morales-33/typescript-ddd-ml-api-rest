import { MenuContainerForMenusDTO } from "../data-transfer-objects/MenuContainerForMenusDTO";
import { MenuContainerForOperationsDTO } from "../data-transfer-objects/MenuContainerForOperationsDTO";
import { MenuId } from "../value-objects/MenuId";
import { MenuName } from "../value-objects/MenuName";
import { MenuState } from "../value-objects/MenuState";
import { MenuContainerForOperations } from "./MenuContainerForOperations";
import { MenuRoot } from '../interfaces/menuRoot'
import { PlatformId } from "../../../Shared/domain/value-objects/PlatformId";
import { ProfileId } from "../../../Shared/domain/value-objects/ProfileId";

export class MenuContainerForMenus implements MenuRoot {
    constructor(
        readonly id: MenuId,
        readonly plataformaId: PlatformId,
        readonly profileId: ProfileId,
        readonly label: MenuName,
        readonly state: MenuState,
        readonly children: (MenuContainerForMenus | MenuContainerForOperations)[]
    ) { }

    static create(
        id: MenuId,
        plataformaId: PlatformId,
        profileId: ProfileId,
        label: MenuName,
        state: MenuState,
        children: MenuContainerForMenus[]
    ): MenuContainerForMenus {
        return new MenuContainerForMenus(
            id,
            plataformaId,
            profileId,
            label,
            state,
            children
        )
    }

    static fromPrimitives(data: MenuContainerForMenusDTO): MenuContainerForMenus {
        return new MenuContainerForMenus(
            new MenuId(data.id),
            new PlatformId(data.plataformaId),
            new ProfileId(data.profileId),
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
            this.plataformaId.value,
            this.profileId.value,
            this.label.value,
            this.state.value,
            this.children.map(entry => entry.toPrimitives())
        )
    }
}

