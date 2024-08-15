
export class ProductionOrderViewDTO {
    constructor(
        public readonly opId: string,
        public readonly referencia: string,
        public readonly registrosCantidad: number,
        public readonly cantidadPlaneada: number,
        public readonly cantidadEjecutada: number,
        public readonly cantidadRestante: number,
        public readonly estado: boolean,
        public readonly ordenAbiertaPorUsuarioId: string,
        public readonly ordenAbiertaPorUsuarioNombre: string,
        public readonly usuarioDescripcion: string,
        public readonly fechaAperturaProceso: string | Date | null,
        public readonly fechaCierreProceso: string | Date | null
    ) { }

}