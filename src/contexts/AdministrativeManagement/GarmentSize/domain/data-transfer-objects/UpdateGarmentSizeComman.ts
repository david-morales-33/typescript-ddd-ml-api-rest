
type params = {
    garmentSizeId: number,
    garmentSizeLabel?: string,
    garmentSizeType?: any,
    garmentSizeState?: boolean,
    garmenSizeOrder?: number,
    createBy: string
}

export class UpdateGarmentSizeComman {

    readonly garmentSizeId: number;
    readonly garmentSizeLabel: string | null;
    readonly garmentSizeType: any | null;
    readonly garmentSizeState: boolean | null;
    readonly garmenSizeOrder: number | null;
    readonly createBy: string;

    constructor({
        garmentSizeId,
        garmenSizeOrder,
        garmentSizeLabel,
        garmentSizeState,
        garmentSizeType,
        createBy
    }: params) {
        this.garmentSizeId = garmentSizeId;
        this.garmentSizeLabel = garmentSizeLabel ?? null;
        this.garmenSizeOrder = garmenSizeOrder ?? null;
        this.garmentSizeState = garmentSizeState ?? null;
        this.garmentSizeType = garmentSizeType ?? null;
        this.createBy = createBy;
    }
}