import { Operation } from "../../../Operation/domain/entities/Operation";
import { PlatformId } from "../../../Shared/domain/value-objects/PlatformId";
import { ProfileId } from "../../../Shared/domain/value-objects/ProfileId";
import { MenuContainerForOperationsDTO } from "../data-transfer-objects/MenuContainerForOperationsDTO";
import { MenuRoot } from "../interfaces/menuRoot";
import { MenuId } from "../value-objects/MenuId";
import { MenuName } from "../value-objects/MenuName";
import { MenuState } from "../value-objects/MenuState";

export class MenuContainerForOperations implements MenuRoot {
    constructor(
        readonly id: MenuId,
        readonly label: MenuName,
        readonly state: MenuState,
        readonly children: Operation[]
    ) { }

    static create(
        id: MenuId,
        label: MenuName,
        state: MenuState,
        children: Operation[]
    ): MenuContainerForOperations {
        return new MenuContainerForOperations(
            id,
            label,
            state,
            children
        );
    }

    static fromPrimitives(data: MenuContainerForOperationsDTO): MenuContainerForOperations {
        return new MenuContainerForOperations(
            new MenuId(data.id),
            new MenuName(data.label),
            new MenuState(data.state),
            data.children.map(entry => Operation.fromPrimitives(entry))
        )
    }

    toPrimitives(): MenuContainerForOperationsDTO {
        return new MenuContainerForOperationsDTO(
            this.id.value,
            this.label.value,
            this.state.value,
            this.children.map(entry => entry.toPrimitives())
        )
    }
}