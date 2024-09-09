
export class ProductionModuleViewDTO {
    constructor(
        public readonly moduloId: number,
        public readonly cantidadDeMaquinas: number,
        public readonly estadoDeOperacion: boolean,
        public readonly cantidadDeOperarios: number,
        public readonly estado: boolean,
        public readonly ordenDeProduccionEnProceso: string,
        public readonly referenciaEnProceso: string,
        public readonly tallaEnProceso: string,
        public readonly colorEnProceso: string,
        public readonly eventoDeModulo: string | null,
        public readonly revisorEnProceso: string,
    ) { }
}