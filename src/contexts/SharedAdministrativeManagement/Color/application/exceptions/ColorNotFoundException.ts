import { ColorId } from "../../../../Shared/domain/value-object/ColorId";

export class ColorNotFoundException extends Error {
    constructor(colorId: ColorId) {
        super(`The Color <${colorId.value}> not found`);
    }
}