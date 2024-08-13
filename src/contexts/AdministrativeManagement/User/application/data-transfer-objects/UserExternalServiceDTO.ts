export class UserExternalServiceDTO {

    private _className: string = 'UserExternalService.DTO';

    constructor(
        readonly userIdType: string,
        readonly userId: string,
        readonly userName: string,
        readonly userDescription: string
    ) { }

    public get className(): string {
        return this._className;
    }
}