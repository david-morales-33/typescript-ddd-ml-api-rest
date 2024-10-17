import { Command } from "../../../../Shared/domain/CQRS/Command";

type params = {
    userId: string,
    newName?: string,
    newIdType?: number,
    newProfileId?: number,
    newDescription?: string,
    newPassword?: string,
    newState?: boolean,
    updateBy: string
}

export class UpdateUserCommand extends Command {

    readonly userId: string;
    readonly newName: string | null;
    readonly newIdType: number | null;
    readonly newProfileId: number | null;
    readonly newDescription: string | null;
    readonly newPassword: string | null;
    readonly newState: boolean | null;
    readonly updateBy: string;

    constructor({
        userId,
        newName,
        newPassword,
        newProfileId,
        newDescription,
        newIdType,
        newState,
        updateBy
    }: params) {
        super();
        this.userId = userId;
        this.updateBy = updateBy;
        this.newName = newName ?? null;
        this.newState = newState ?? null;
        this.newPassword = newPassword ?? null;
        this.newProfileId = newProfileId ?? null;
        this.newDescription = newDescription ?? null;
        this.newIdType = newIdType ?? null
    }

}