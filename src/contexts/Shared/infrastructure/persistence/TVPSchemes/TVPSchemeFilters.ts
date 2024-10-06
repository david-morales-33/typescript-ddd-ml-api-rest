import sql from 'mssql';

export const TVPSchemeFilters = [
    { name: 'operador_logico', type: sql.VarChar },
    { name: 'campo', type: sql.VarChar },
    { name: 'operador_comparacion', type: sql.VarChar },
    { name: 'valor', type: sql.VarChar },
]