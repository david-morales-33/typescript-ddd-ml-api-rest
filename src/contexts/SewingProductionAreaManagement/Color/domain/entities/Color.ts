import { ColorDTO } from "../data-transfer-objects/ColorDTO";
import { ColorRoot } from "../interfaces/ColorRoot";
import { ColorId } from "../value-objects/ColorId";
import { ColorLabel } from "../value-objects/ColorLabel";
import { ColorState } from "../value-objects/ColorState";

export class Color implements ColorRoot {

    constructor(
        readonly id: ColorId,
        readonly label: ColorLabel,
        readonly state: ColorState
    ) { }

    static create(
        id: ColorId,
        label: ColorLabel,
        state: ColorState
    ): Color {
        return new Color(
            id,
            label,
            state
        )
    }
    
    static fromPrimitives(data: ColorDTO): Color {
        return new Color(
            new ColorId(data.id),
            new ColorLabel(data.label),
            new ColorState(data.state)
        )
    }

    toPrimitive(): ColorDTO {
        return new ColorDTO(
            this.id.value,
            this.label.value,
            this.state.value
        )
    }
}