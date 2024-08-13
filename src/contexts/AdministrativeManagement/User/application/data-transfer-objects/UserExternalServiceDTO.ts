
// <xs:element name="TIPO_ID" type="xs:string" minOccurs="0" />
// <xs:element name="CC" type="xs:string" minOccurs="0" />
// <xs:element name="NOMBRE" type="xs:string" minOccurs="0" />
// <xs:element name="Descripcion" type="xs:string" minOccurs="0" />

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