import { ColorId } from "../../../shared/domain/value-objects/ColorId";

export class ColorNotFoundException extends Error {
    constructor(colorId: ColorId) {
        super(`The Color <${colorId.value}> not found`);
    }
}