import { ColorId } from "../../../../shared/domain/value-objects/ColorId";
import { ColorNotFoundException } from "../../exceptions/ColorNotFoundException";
import { ColorQueryRepository } from "../../repositories/ColorQueryRepository";


export class ColorFinder {
    constructor(private colorQueryRepository: ColorQueryRepository) { }

    async execuete(colorId: ColorId) {

        const color = await this.colorQueryRepository.find(colorId);

        if (color === null)
            throw new ColorNotFoundException(colorId);
        return color;
    }
}