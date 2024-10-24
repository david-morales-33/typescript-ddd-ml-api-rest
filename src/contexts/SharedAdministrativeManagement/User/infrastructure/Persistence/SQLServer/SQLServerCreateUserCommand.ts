import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { AuthUser } from "../../../domain/entities/AuthUser";
import { UserCommandRepository } from "../../../domain/repositories/UserCommandRepository";
import sql from 'mssql'

export class SQLServerCreateUserCommand extends SQLServerRepository implements UserCommandRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_administracion_usuario_insersion'
    }
    async save(user: AuthUser): Promise<void> {
        if (user.eventList.length === 0) throw new Error('No se proporcionó la información necesaria para la creación del usuario');
        const [{ createBy }] = user.eventList;
        const params: dbParameters[] = [
            { name: 'id_documento', type: sql.VarChar, value: user.id.value },
            { name: 'id_tipo_documento', type: sql.Int, value: user.idType.value },
            { name: 'nombre', type: sql.VarChar, value: user.name.value },
            { name: 'contrasena', type: sql.VarChar, value: user.password.value },
            { name: 'id_perfil', type: sql.Int, value: user.profileId.value },
            { name: 'ingresado_por', type: sql.VarChar, value: createBy.value },
        ]
        try { await this.execute(params) }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}