import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UserPermissionValidator } from "../../../../UserPermission/application/Validate/UserPermissionValidator";
import { UserPermission } from "../../../../UserPermission/domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../../UserPermission/domain/repositories/UserPermissionRepository";
import { UserPermissionId } from "../../../../UserPermission/domain/value-objects/UserPermissionId";
import { UserPermissionLabel } from "../../../../UserPermission/domain/value-objects/UserPermissionLabel";

export class SetProductionOrderDetailPlannedDatesValidator {
    constructor(
        private userPermissionsRepository: UserPermissionRepository,
    ) { }

    async execute(userId: UserId) {

        const eventPermission = UserPermission.create(
            new UserPermissionId(23),
            new UserPermissionLabel('Asignar Fecha de Ejecucion de Detalle OP')
        );

        const userPermissionValidator = new UserPermissionValidator(this.userPermissionsRepository);
        await userPermissionValidator.execute({
            userId: userId,
            useCasePermission: eventPermission
        });
    }
}