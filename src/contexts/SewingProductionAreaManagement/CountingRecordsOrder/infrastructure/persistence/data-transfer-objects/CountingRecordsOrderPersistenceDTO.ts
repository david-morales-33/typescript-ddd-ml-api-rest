
export abstract class CountingRecordsOrderPersistenceDTO {
    public readonly abstract ocr_id: string;
    public readonly abstract op: string;
    public readonly abstract referencia: string;
    public readonly abstract tipo_referencia: string;
    public readonly abstract tipo_prenda: string;
    public readonly abstract tipo_op: string;
    public readonly abstract etiqueta_color: string;
    public readonly abstract codigo_color: string;
    public readonly abstract talla: string;
    public readonly abstract proceso: string;
    public readonly abstract modulo: number;
    public readonly abstract ean: string;
    public readonly abstract cantidad_registros: number;
    public readonly abstract fecha_creacion: string;
    public readonly abstract inicio_operacion: string;
    public readonly abstract fin_operacion: string;
    public readonly abstract etiqueta: string;
    public readonly abstract estado: string;
    public readonly abstract evt_id: string
}

