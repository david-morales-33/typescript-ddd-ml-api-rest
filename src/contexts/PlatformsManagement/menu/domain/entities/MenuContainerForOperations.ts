import { Operation } from "../../../operation/domain/entities/Operation";
import { MenuContainerForOperationsDTO } from "../data-transfer-objects/MenuContainerForOperationsDTO";
import { MenuRoot } from "../interfaces/MenuRoot";
import { MenuId } from "../value-objects/MenuId";
import { MenuName } from "../value-objects/MenuName";
import { MenuState } from "../value-objects/MenuState";

export class MenuContainerForOperations implements MenuRoot {
    constructor(
        readonly id: MenuId,
        readonly name: MenuName,
        readonly state: MenuState,
        readonly children: Operation[]
    ) { }

    static create(id: MenuId, name: MenuName, state: MenuState, children: Operation[]):
        MenuContainerForOperations {
        return new MenuContainerForOperations(id, name, state, children);
    }

    static fromPrimitives(data: MenuContainerForOperationsDTO): MenuContainerForOperations {
        return new MenuContainerForOperations(
            new MenuId(data.id),
            new MenuName(data.name),
            new MenuState(data.state),
            data.children.map(entry => { return Operation.fromPrimitives(entry) })
        )
    }

    toPrimitives(): MenuContainerForOperationsDTO {
        return new MenuContainerForOperationsDTO(
            this.id.value,
            this.name.value,
            this.state.value,
            this.children.map(entry => { return entry.toPrimitives() })
        )
    }
}