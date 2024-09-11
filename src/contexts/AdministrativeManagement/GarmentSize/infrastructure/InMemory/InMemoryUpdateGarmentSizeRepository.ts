import { GarmentSize } from "../../domain/entities/GarmentSize";
import { GarmentSizeCommandRepository } from "../../domain/repositories/GarmentSizeCommandRepository";


export class InMemoryUpdateGarmentSizeRepository implements GarmentSizeCommandRepository {
    async save(GarmentSize: GarmentSize): Promise<void> {
        // const update = new InMemoryUpdateGarmentSizeRepository();
        // const query = new InMemoryGarmentSizeQueryRepository();

        // const userPermissions = new InMemoryUserPermissionRepository();
        // const validator = new UpdateGarmentSizeValidator(userPermissions);

        // const updater = new GarmentSizeUpdater(query, update);

        // const commandHandler = new UpdateGarmentSizeCommandHandler(validator, updater);

        // const command =new UpdateGarmentSizeCommand({
        //     updateBy:'116441925',
        //     garmentSizeId: 1,
        //     garmentSizeLabel:'xl',
        //     garmenSizeOrder:1,
        //     garmentSizeState: false,
        //     garmentSizeType:'Brasier'
        // });

        // commandHandler.handle(command)
        console.log('Se a actualizado la talla...');
        console.log(GarmentSize.toPrimitives())
    }
}