import { ColorQueryRepository } from "../../repositories/ColorQueryRepository";

export class ColorSearcher {
    constructor(private colorQueryRepository: ColorQueryRepository) { }

    async execute() {
        return this.colorQueryRepository.searchAll();
    }
}