
export class ProductionOrderDetailViewDTO {
    constructor(
        public readonly opId: string,
        public readonly colorId: string,
        public readonly colorEtiqueta: string,
        public readonly tallaId: number,
        public readonly tallaEtiqueta: string,
        public readonly referencia: string,
        public readonly ean: string,
        public readonly cantidadDeRegistros: string,
        public readonly cantidadPlaneada: string,
        public readonly cantidadEjecutada: string,
        public readonly cantidadRestante: string,
        public readonly estado: string,
        public readonly ordenIniciadaPorUsuarioId: string,
        public readonly ordenIniciadaPorUsuarioNombre: string,
        public readonly descripcionDeUsuario: string,
        public readonly fechaDeInicio: string | Date | null,
        public readonly fechaDeFinalizacion: string | Date | null
    ) { }
}