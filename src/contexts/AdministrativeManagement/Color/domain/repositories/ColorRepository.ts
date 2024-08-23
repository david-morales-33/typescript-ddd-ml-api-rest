import { ColorId } from "../../../shared/domain/value-objects/ColorId";
import { Color } from "../entities/Color";

export interface ColorRepositories {
    find(colorId: ColorId): Promise<Color | null>;
    save(color: Color): Promise<void>;
} 