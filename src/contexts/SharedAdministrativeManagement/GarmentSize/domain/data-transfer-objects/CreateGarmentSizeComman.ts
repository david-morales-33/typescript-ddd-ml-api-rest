
type params = {
    garmentSizeId: number,
    garmentSizeLabel: string,
    garmentSizeType: any,
    garmenSizeOrder: number,
    createBy: string
}

export class CreateGarmentSizeComman {

    readonly garmentSizeLabel: string;
    readonly garmentSizeType: any;
    readonly garmenSizeOrder: number;
    readonly garmentSizeId: number;
    readonly createBy: string;

    constructor({
        garmenSizeOrder,
        garmentSizeLabel,
        garmentSizeType,
        garmentSizeId,
        createBy
    }: params) {
        this.garmentSizeLabel = garmentSizeLabel;
        this.garmenSizeOrder = garmenSizeOrder;
        this.garmentSizeType = garmentSizeType;
        this.garmentSizeId = garmentSizeId;
        this.createBy = createBy;
    }
}