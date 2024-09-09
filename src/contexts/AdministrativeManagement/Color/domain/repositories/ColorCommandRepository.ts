import { Color } from "../entities/Color";

export interface ColorCommandRepository {
    save(color: Color): Promise<void>
}