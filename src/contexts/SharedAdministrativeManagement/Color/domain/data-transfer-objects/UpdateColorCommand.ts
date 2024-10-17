import { Command } from "../../../../Shared/domain/CQRS/Command";

type params = {
    updateBy: string,
    colorId: string,
    newLabel?: string,
    newState?: boolean
}

export class UpdateColorCommand implements Command {
    readonly updateBy: string;
    readonly colorId: string;
    readonly newLabel: string | null;
    readonly newState: boolean | null;
    
    constructor({
        updateBy,
        colorId,
        newLabel,
        newState
    }: params) {
        this.updateBy = updateBy;
        this.colorId = colorId;
        this.newLabel = newLabel ?? null;
        this.newState = newState ?? null;
    }
}