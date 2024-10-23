import { Query } from "../../../../Shared/domain/CQRS/Query";

export class SearchAllScheduleQuery implements Query {
    constructor(public readonly productionModuleId: number) { }
}