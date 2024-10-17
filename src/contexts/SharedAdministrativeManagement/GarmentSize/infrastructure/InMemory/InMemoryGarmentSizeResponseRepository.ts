import { GarmentSizeViewDTO } from "../../domain/data-transfer-objects/GarmentSizeViewDTO";
import { GarmentSize } from "../../domain/entities/GarmentSize";
import { GarmentSizeResponseRepository } from "../../domain/repositories/GarmentSizeResponseRepository";
import { GarmentSizeId } from "../../domain/value-objects/GarmentSizeId";


export class InMemoryGarmentSizeResponseRepository implements GarmentSizeResponseRepository{
    private garmentSizeList : GarmentSizeViewDTO[];

    constructor(){
        this.garmentSizeList=[
            new GarmentSizeViewDTO(1,'XL','Panty',0,true),
            new GarmentSizeViewDTO(2,'X','Panty',0,true),
            new GarmentSizeViewDTO(3,'2XL','Panty',0,true),
        ]
    }
    
    async find(garmentSizeId: GarmentSizeId): Promise<GarmentSizeViewDTO | null> {
        // const response = new InMemoryGarmentSizeResponseRepository();
        // const finder = new GarmentSizeFinder(response);

        // const query = new FindGarmentSizeQuery(1);

        // const queryHandler = new FindGarmentSizeQueryHandler(finder);

        // queryHandler.handle(query).then(res=> console.log(res))
       const garmentSize = this.garmentSizeList.find(entry => entry.tallaId === garmentSizeId.value);
       
       if(garmentSize===undefined)
            return null;

       return garmentSize;
    }
}