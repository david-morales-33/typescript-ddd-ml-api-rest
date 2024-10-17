import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { ColorLabel } from "../../../../Shared/domain/value-object/ColorLabel";
import { Color } from "../../domain/entities/Color";
import { ColorQueryRepository } from "../../domain/repositories/ColorQueryRepository";
import { ColorState } from "../../domain/value-objects/ColorState";

export class InMemoryColorQueryRepository implements ColorQueryRepository {
    private colorList: Color[]

    constructor() {
        this.colorList = [
            new Color(
                new ColorId('1010'),
                new ColorLabel('BLANCO'),
                new ColorState(true),
                []
            ),
            new Color(
                new ColorId('1020'),
                new ColorLabel('NEGRO'),
                new ColorState(true),
                []
            ),
        ]
    }

    async find(colorId: ColorId): Promise<Color | null> {
        const color = this.colorList.find(entry => entry.id.value === colorId.value);

        if (color === undefined)
            return null;

        return color;
    }
}