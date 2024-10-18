
export class AuthenticationTokenDTO {
    constructor(
        readonly tokenId: string,
        readonly expirationDate: Date,
        readonly creationDate: Date,
        readonly state: boolean
    ) { }
}