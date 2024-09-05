import { Query } from '../../../../../Shared/domain/Query'

export class ProductionModuleReportsQuery implements Query {
    constructor(
        readonly productionModuleId: number
    ){}
}