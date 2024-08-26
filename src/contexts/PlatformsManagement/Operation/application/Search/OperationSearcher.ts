import { EnviromentId } from "../../../Shared/domain/value-objects/EnviromentId";
import { PlatformId } from "../../../Shared/domain/value-objects/PlatformId";
import { ProfileId } from "../../../Shared/domain/value-objects/ProfileId";
import { OperationRepository } from "../../domain/repositories/OperationRepository";
import { OperationResponse } from "./OperationResponse";

export class OperationFinder {
    constructor(private operationRepository: OperationRepository) { }

    async execute(enviromentId?: EnviromentId, profileId?: ProfileId, platformId?: PlatformId) {

        const operations = await this.operationRepository.match({
            enviromentId,
            profileId,
            platformId
        });
        return new OperationResponse(operations);
    }
}