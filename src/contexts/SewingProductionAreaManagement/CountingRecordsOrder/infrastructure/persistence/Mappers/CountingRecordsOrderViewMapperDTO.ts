import { CountingRecordsOrderViewDTO } from "../../../domain/data-transfer-object/CountingRecordsOrderViewDTO";

export interface PersistenceObject {
    ocr_id: string,
    op: string,
    referencia: string,
    tipo_referencia: string,
    tipo_prenda: string,
    tipo_op: string,
    etiqueta_color: string,
    codigo_color: string,
    talla: string,
    proceso: string,
    modulo: number,
    ean: string,
    cantidad_registros: number,
    fecha_creacion: Date,
    inicio_operacion: Date,
    fin_operacion: Date,
    categoria_id: number,
    categoria: string,
    estado: boolean,
    evento_id: string | null,
    evento: string | null

}

export class CountingRecordsOrderViewMapperDTO {
    static convertFromPersistenceObject(entity: PersistenceObject): CountingRecordsOrderViewDTO {
        return new CountingRecordsOrderViewDTO(
            entity.ocr_id,
            entity.op,
            entity.referencia,
            entity.talla,
            entity.codigo_color,
            entity.etiqueta_color,
            entity.cantidad_registros,
            entity.ean,
            entity.inicio_operacion.toDateString(),
            entity.fin_operacion.toDateString(),
            entity.categoria_id,
            entity.categoria,
            entity.modulo,
            `MODULO-${entity.modulo}`,
            entity.estado,
            entity.evento,
            entity.evento_id,
            'no asignado revisor',
            'no asignado revisor',
            entity.fecha_creacion,
            '',
            '',
            '',
            ''
        )
    }
}

