import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { Color } from "../entities/Color";

export interface ColorQueryRepository {
    find(colorId: ColorId): Promise<Color | null>
}