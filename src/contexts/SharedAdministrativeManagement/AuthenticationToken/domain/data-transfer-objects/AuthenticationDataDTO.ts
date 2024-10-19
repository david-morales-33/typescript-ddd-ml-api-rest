
export class AuthenticationDataDTO {
    constructor(
        readonly userId: string,
        readonly profileId: number,
        readonly craetionDate: Date,
        readonly expirationDate: Date
    ) { }
}