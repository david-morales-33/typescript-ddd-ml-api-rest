export class CountingRecordsOrderIdDTO {
    constructor(
        public readonly countingRecordsOrderId: string,
        public readonly colorId: string,
        public readonly garmentSizeId: string,
        public readonly ordenProductionId: string,
    ) { }
}

export interface CountingRecordsOrderIdPersistenceObject {
    ocr_id: string,
    op: string,
    talla: string,
    codigo_color: string
}

export class CountingRecordsOrderIdMapperDTO {
    static convertFromPersistenceObject(entity: CountingRecordsOrderIdPersistenceObject): CountingRecordsOrderIdDTO {
        return new CountingRecordsOrderIdDTO(
            entity.ocr_id,
            entity.codigo_color,
            entity.talla,
            entity.op
        )
    }
}