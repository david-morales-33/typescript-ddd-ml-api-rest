import { Color } from "../entities/Color";

export interface ColorRepository{
    save(): Promise<void>;
    find(): Promise<Color>
}