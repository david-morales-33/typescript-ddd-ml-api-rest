
type params = {
    garmentSizeId: string,
    garmentSizeLabel?: string,
    garmentSizeType?: any,
    garmentSizeState?: boolean,
    garmenSizeOrder?: number,
    updateBy: string
}

export class UpdateGarmentSizeCommand {

    readonly garmentSizeId: string;
    readonly garmentSizeLabel: string | null;
    readonly garmentSizeType: any | null;
    readonly garmentSizeState: boolean | null;
    readonly garmenSizeOrder: number | null;
    readonly updateBy: string;

    constructor({
        garmentSizeId,
        garmenSizeOrder,
        garmentSizeLabel,
        garmentSizeState,
        garmentSizeType,
        updateBy
    }: params) {
        this.garmentSizeId = garmentSizeId;
        this.garmentSizeLabel = garmentSizeLabel ?? null;
        this.garmenSizeOrder = garmenSizeOrder ?? null;
        this.garmentSizeState = garmentSizeState ?? null;
        this.garmentSizeType = garmentSizeType ?? null;
        this.updateBy = updateBy;
    }
}