import { Command } from "../../../../Shared/domain/Command";

type params = {
    userId: string;
    userProfileId: number;
    userPassword: string;
    userIdType: number;
    createBy: string;
}

export class CreateUserCommand extends Command {
    
    readonly userId: string;
    readonly userIdType: number;
    readonly userPassword: string;
    readonly userProfileId: number;
    readonly createBy: string;

    constructor({
        userId,
        userIdType,
        userPassword,
        userProfileId,
        createBy
    }: params) {
        super();
        this.userId = userId;
        this.userIdType = userIdType;
        this.userPassword = userPassword;
        this.userProfileId = userProfileId;
        this.createBy = createBy
    }
}