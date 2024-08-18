
export class ProductionModuleViewDTO {
    constructor(
        public readonly moduloId: number,
        public readonly moduloEtiqueta: string,
        public readonly cantidadDeMaquinas: number,
        public readonly estado: boolean,
        public readonly estadoDeOperacion: boolean,
        public readonly cantidadDeOperarios: number,
        public readonly opEnProceso: string,
        public readonly referenciaEnProceso: string,
        public readonly tallaEnProceso: string,
        public readonly colorEnProceso: string,
        public readonly eventualidadId: string,
        public readonly eventualidadEtiqueta: string
    ) { }
}