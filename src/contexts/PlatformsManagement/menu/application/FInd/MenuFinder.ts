import { EnviromentId } from "../../../Shared/domain/value-objects/EnviromentId";
import { PlatformId } from "../../../Shared/domain/value-objects/PlatformId";
import { ProfileId } from "../../../Shared/domain/value-objects/ProfileId";
import { MenuRepository } from "../../domain/repositories/MenuRepository";
import { MenuResponse } from "./MenuResponse";


export class MenuFinder {
    constructor(private menuRepository: MenuRepository) { }

    async execute(enviromentId?: EnviromentId, profileId?: ProfileId, platformId?: PlatformId) {
        const menu = await this.menuRepository.match({
            enviromentId,
            profileId,
            platformId
        });
        if (menu === null)
            throw new Error(`Menu not found`);
        return new MenuResponse(menu);
    }
}