import sql from 'mssql';

export const TVPSchemeCountingRecordsOrderDetailOp = [
    { name: 'clr_id', type: sql.VarChar },
    { name: 'tll_id', type: sql.VarChar },
    { name: 'fecha_apertura_proceso_op_detalles', type: sql.DateTime },
    { name: 'fecha_cierre_proceso_op_detalles', type: sql.DateTime },
    { name: 'cantidad_registros_actualizados_op_detalles', type: sql.Int },
    { name: 'cantidad_unidades_actualizadas_op_detalles', type: sql.BigInt }
]