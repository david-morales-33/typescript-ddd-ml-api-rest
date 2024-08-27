import { EnviromentId } from "../../../Shared/domain/value-objects/EnviromentId";
import { PlatformId } from "../../../Shared/domain/value-objects/PlatformId";
import { ProfileId } from "../../../Shared/domain/value-objects/ProfileId";
import { Operation } from "../entities/Operation";

export interface OperationRepository {
    match(criteria: { enviromentId?: EnviromentId, profileId?: ProfileId, platformId?: PlatformId }): Promise<Operation[]>;
}