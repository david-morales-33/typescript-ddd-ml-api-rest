import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";


export class CreateProductionOrderValidator {
    
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
    ) { }

    async execute(openByUser: UserId ) {

        const eventPermission = UserPermission.create(
            new UserPermissionId(21),
            new UserPermissionLabel('Abrir OP')
        );

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);

        await userPermissionValidator.execute({
            userId: openByUser,
            useCasePermission: eventPermission
        });

    }
}