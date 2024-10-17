import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/CQRS/QueryHandler";
import { ColorId } from "../../../../../Shared/domain/value-object/ColorId";
import { ColorFinder } from "./ColorFinder";
import { ColorResponse } from "./ColorResponse";
import { FindColorQuery } from "./FindColorQuery";

export class FindColorQueryHandler implements QueryHandler<FindColorQuery, ColorResponse> {
    constructor(private colorFinder: ColorFinder) { }

    subscribedTo(): Query {
        return FindColorQuery;
    }
    async handle(query: FindColorQuery): Promise<ColorResponse> {
        const colorId = new ColorId(query.colorId);

        return this.colorFinder.execuete(colorId);
    }
}