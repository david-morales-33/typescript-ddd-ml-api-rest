import { Color } from "../../domain/entities/Color";
import { ColorCommandRepository } from "../../domain/repositories/ColorCommandRepository";

export class InMemoryUpdateColorRepository implements ColorCommandRepository{

    async save(color: Color): Promise<void> {
        // const query = new InMemoryColorQueryRepository();
        // const update = new InMemoryUpdateColorRepository();
        // const userPermission = new InMemoryUserPermissionRepository();

        // const updater = new ColorUpdater(query, update);

        // const validator = new UpdateColorValidator(userPermission);

        // const command = new UpdateColorCommand({
        //     updateBy:'1146441925',
        //     colorId:'1010',
        //     newState:false,
        //     newLabel:'BLANCO OSCURO'
        // });

        // const queryHandler = new UpdateColorCommandHandler(updater,validator);

        // queryHandler.handle(command);
        console.log('Se ha creado el color...')
        console.log(color.toPrimitives())
    }
}