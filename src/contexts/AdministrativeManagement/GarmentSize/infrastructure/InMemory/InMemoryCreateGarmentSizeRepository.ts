import { GarmentSize } from "../../domain/entities/GarmentSize";
import { GarmentSizeCommandRepository } from "../../domain/repositories/GarmentSizeCommandRepository";

export class InMemoryCreateGarmentSizeRepository implements GarmentSizeCommandRepository {
    async save(GarmentSize: GarmentSize): Promise<void> {
        // const query = new InMemoryGarmentSizeQueryRepository();
        // const create = new InMemoryCreateGarmentSizeRepository();

        // const userPermissions = new InMemoryUserPermissionRepository();

        // const createValidator = new CreateGarmentSizeValidator(query, userPermissions);
        // const creator = new GarmentSizeCreator(create);

        // const commandHandler = new CreateGarmentSizeCommandHandler(createValidator, creator)

        // const command = new CreateGarmentSizeComman({
        //     garmenSizeOrder: 0,
        //     garmentSizeId: 5,
        //     garmentSizeLabel: '5XL',
        //     garmentSizeType: 'Panty',
        //     createBy: '11464411925'
        // });

        // commandHandler.handle(command);
        console.log('Se ha creado la nueva talla');
        console.log(GarmentSize.toPrimitives())
    }
}