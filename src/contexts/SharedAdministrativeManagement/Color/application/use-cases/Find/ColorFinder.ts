import { ColorId } from "../../../../../Shared/domain/value-object/ColorId";
import { ColorResponseRepository } from "../../../domain/repositories/ColorResponseRepository";
import { ColorNotFoundException } from "../../exceptions/ColorNotFoundException";

export class ColorFinder {
    constructor(private colorQueryRepository: ColorResponseRepository) { }

    async execuete(colorId: ColorId) {

        const color = await this.colorQueryRepository.find(colorId);

        if (color === null)
            throw new ColorNotFoundException(colorId);
        
        return color;
    }
}