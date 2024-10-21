import sql from 'mssql';

export const TVPSchemeCountingRecordsOrderDetailOp = [
    { name: 'id_ocr', type: sql.VarChar },
    { name: 'id_clr', type: sql.VarChar },
    { name: 'id_tll', type: sql.VarChar },
    { name: 'id_hrp', type: sql.Int },
    { name: 'cantidad_registros', type: sql.Int },
    { name: 'inicio_operacion', type: sql.Time },
    { name: 'fin_operacion', type: sql.Time }
]