
export class ProductionOrderDetailViewDTO {
    constructor(
        public readonly opId: string,
        public readonly colorId: string,
        public readonly colorEtiqueta: string,
        public readonly tallaEtiqueta: string,
        public readonly referencia: string,
        public readonly cantidadPlaneada: number,
        public readonly cantidadEjecutada: number,
        public readonly cantidadRestante: number,
        public readonly estado: boolean,
        public readonly ordenIniciadaPorUsuarioId: string,
        public readonly ordenIniciadaPorUsuarioNombre: string,
        public readonly descripcionDeUsuario: string,
        public readonly fechaDeInicio: string | Date | null,
        public readonly fechaDeFinalizacion: string | Date | null
    ) { }
}