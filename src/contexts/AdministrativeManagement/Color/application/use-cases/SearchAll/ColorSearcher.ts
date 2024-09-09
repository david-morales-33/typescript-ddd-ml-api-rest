import { ColorResponseRepository } from "../../../domain/repositories/ColorResponseRepository";

export class ColorSearcher {
    constructor(private colorQueryRepository: ColorResponseRepository) { }

    async execute() {
        return this.colorQueryRepository.searchAll();
    }
}