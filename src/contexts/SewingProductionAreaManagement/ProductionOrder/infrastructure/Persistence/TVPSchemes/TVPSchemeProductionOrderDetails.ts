import sql from 'mssql';

export const TVPSchemeProductionOrderDetails = [
    { name: 'id_talla', type: sql.VarChar },
    { name: 'id_color', type: sql.VarChar },
    { name: 'color_etiqueta', type: sql.VarChar },
    { name: 'ean', type: sql.VarChar },
    { name: 'cantidad_unidades_planeadas', type: sql.BigInt }
]