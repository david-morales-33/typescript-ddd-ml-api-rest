
export class UserViewDTO {
    constructor(
        public readonly nombre: string,
        public readonly documentoId: string,
        public readonly contrasena: string,
        public readonly descripcion: string,
        public readonly estado: boolean,
        public readonly tipoDocumentoId: number,
        public readonly tipoDocumentoEtiqueta: string,
        public readonly perfilId: number,
        public readonly perfilEtiqueta: string
    ) { }
}