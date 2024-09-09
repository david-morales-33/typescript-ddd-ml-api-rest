import { ColorId } from "../../../shared/domain/value-objects/ColorId";
import { Color } from "../entities/Color";

export interface ColorQueryRepository {
    find(colorId: ColorId): Promise<Color | null>
}