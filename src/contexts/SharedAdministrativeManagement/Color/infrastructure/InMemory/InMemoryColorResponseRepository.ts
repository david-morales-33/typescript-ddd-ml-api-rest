import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { ColorViewDTO } from "../../domain/data-transfer-objects/ColorViewDTO";
import { ColorResponseRepository } from "../../domain/repositories/ColorResponseRepository";

export class InMemoryColorResponseRepository implements ColorResponseRepository {

    private colorList: ColorViewDTO[];

    constructor() {
        this.colorList = [
            new ColorViewDTO('1010', 'BLANCO', true),
            new ColorViewDTO('1020', 'NEGRO', true),
        ]
    }

    async find(colorId: ColorId): Promise<ColorViewDTO | null> {       
        // const response = new InMemoryColorResponseRepository();
        // const finder = new ColorFinder(response);
        // const queryHandler = new FindColorQueryHandler(finder);
        // const query = new FindColorQuery('1030');
        // queryHandler.handle(query).then(res => console.log(res))
        const color = this.colorList.find(entry => entry.colorId === colorId.value);

        if (color === undefined)
            return null;

        return color;
    }

    async searchAll(): Promise<ColorViewDTO[]> {
        // const response = new InMemoryColorResponseRepository();
        // const searcher = new ColorSearcher(response);
        // const query = new SearchColorQuery();
        // const queryHandler = new SearchColorQueryHandler(searcher);
        // queryHandler.handle().then(res=> console.log(res))
        return this.colorList;
    }
}