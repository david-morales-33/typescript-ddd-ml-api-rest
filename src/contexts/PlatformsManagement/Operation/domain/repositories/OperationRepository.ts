import { Criteria } from "../../../../Shared/domain/Criteria/Criteria";
import { EnviromentId } from "../../../Shared/domain/value-objects/EnviromentId";
import { PlatformId } from "../../../Shared/domain/value-objects/PlatformId";
import { ProfileId } from "../../../Shared/domain/value-objects/ProfileId";
import { Operation } from "../entities/Operation";

export interface OperationRepository {
    match(criteria: Criteria): Promise<Operation[]>;
}