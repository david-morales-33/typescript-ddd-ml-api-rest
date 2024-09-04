
export class CountingRecordsOrderViewDTO {
    constructor(
        public readonly ocrId: number,
        public readonly opId: string,
        public readonly referencia: string,
        public readonly tallaId: number,
        public readonly tallaEtiqueta: string,
        public readonly colorId: string,
        public readonly colorEtiqueta: string,
        public readonly cantidadRegistrada: number,
        public readonly ean: string,
        public readonly horaDeInicio: string,
        public readonly horaDeFinalizacion: string,
        public readonly categoriaId: number,
        public readonly categoriaEtiqueta: string,
        public readonly moduloId: number,
        public readonly moduloEtiqueta: string,
        public readonly estado: boolean,
        public readonly anormalidadId: string | null,
        public readonly anormalidadEtiqueta: string | null,
        public readonly revisorDeModuloId: string,
        public readonly revisorDeModuloNombre: string,
        public readonly fechaDeRegistro: Date | string,
        public readonly procesoAdministrativoEtiqueta: string | null,
        public readonly revisorDeFacturacionId: string | null,
        public readonly revisorDeFacturacionNombre: string | null,
        public readonly fechaDeRevision: string | Date | null
    ) { }
}