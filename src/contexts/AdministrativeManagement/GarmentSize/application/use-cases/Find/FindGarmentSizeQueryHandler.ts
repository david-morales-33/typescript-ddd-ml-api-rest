import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/design-patterns/CQRS/QueryHandler";
import { GarmentSizeId } from "../../../domain/value-objects/GarmentSizeId";
import { FindGarmentSizeQuery } from "./FindGarmentSizeQuery";
import { GarmentSizeFinder } from "./GarmentSizeFinder";
import { GarmentSizeReponse } from "./GarmentSizeReponse";


export class FindGarmentSizeQueryHandler implements QueryHandler<FindGarmentSizeQuery, GarmentSizeReponse>{
    constructor(private garmentSizeFinder: GarmentSizeFinder){}

    subscribedTo(): Query {
        return FindGarmentSizeQuery;
    }

    async handle(query: FindGarmentSizeQuery): Promise<GarmentSizeReponse> {
        
        const garmentSizeId = new GarmentSizeId(query.garmentSizeId);
        return await this.garmentSizeFinder.execute(garmentSizeId)
    }
}