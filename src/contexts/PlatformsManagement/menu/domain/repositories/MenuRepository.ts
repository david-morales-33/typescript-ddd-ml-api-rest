import { EnviromentId } from "../../../Shared/domain/value-objects/EnviromentId";
import { PlatformId } from "../../../Shared/domain/value-objects/PlatformId";
import { ProfileId } from "../../../Shared/domain/value-objects/ProfileId";
import { MenuContainerForMenus } from "../entities/MenuContainerForMenus";

export interface MenuRepository {
    match(criteria: { enviromentId?: EnviromentId, profileId?: ProfileId, platformId?: PlatformId }): Promise<MenuContainerForMenus | null>;
}