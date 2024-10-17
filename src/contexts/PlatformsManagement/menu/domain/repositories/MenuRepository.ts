import { Criteria } from "../../../../Shared/domain/Criteria/Criteria";
import { MenuContainerForMenus } from "../entities/MenuContainerForMenus";

export interface MenuRepository {
    match(criteria: Criteria): Promise<MenuContainerForMenus[]>;
}