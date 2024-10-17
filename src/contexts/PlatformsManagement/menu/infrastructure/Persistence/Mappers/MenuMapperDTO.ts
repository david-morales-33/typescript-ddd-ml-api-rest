import { MenuContainerForMenusDTO } from "../../../domain/data-transfer-objects/MenuContainerForMenusDTO";
import { MenuContainerForMenus } from "../../../domain/entities/MenuContainerForMenus";

export interface MenuPersistenceObject {
    mnu_id: number;
    mnu_id_maestro: number;
    etiqueta: string;
}

export class MenuMapperDTO {
    static convertFromPersistenceObject(entity : MenuPersistenceObject): MenuContainerForMenus{
        return MenuContainerForMenus.fromPrimitives(
            new MenuContainerForMenusDTO(
                entity.mnu_id,
                entity.mnu_id_maestro,
                entity.etiqueta,
                true,
                []
            )
        )
    }
}