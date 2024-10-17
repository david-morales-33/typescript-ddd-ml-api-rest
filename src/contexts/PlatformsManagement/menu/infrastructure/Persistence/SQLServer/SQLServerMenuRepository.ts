import { Criteria } from "../../../../../Shared/domain/design-patterns/Criteria/Criteria";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { TVPSchemeFields } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFields";
import { TVPSchemeFilters } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFilters";
import { OperationDTO } from "../../../../Operation/domain/data-transfer-objects/OperationDTO";
import { MenuContainerForOperationsDTO } from "../../../domain/data-transfer-objects/MenuContainerForOperationsDTO";
import { MenuContainerForMenus } from "../../../domain/entities/MenuContainerForMenus";
import { MenuContainerForOperations } from "../../../domain/entities/MenuContainerForOperations";
import { MenuRepository } from "../../../domain/repositories/MenuRepository";
import { TVPSchemeMenu } from "../TVPSchemes/TVPSchemeMenu";
import sql from 'mssql';

interface OperationPersistenceObject {
    ope_id: number,
    ptf_id: number,
    prf_id: number,
    mnu_id: number,
    mnu_id_maestro: number,
    menu: string,
    operacion: string
}

export class SQLServerMenuRepository extends SQLServerRepository implements MenuRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }

    async match(criteria: Criteria): Promise<MenuContainerForMenus[]> {
        console.log(criteria)
        const tvp_filds = this.createTVPTable(
            TVPSchemeMenu,
            'tvp_gestion_ml_db_filtro_campo_solicitud',
            TVPSchemeFields
        );
        const params: dbParameters[] = [
            { name: 'entidad', type: sql.VarChar, value: 'menu' },
            { name: 'campos', type: sql.TVP, value: tvp_filds }
        ]
        try {
            // const menuList: MenuPersistenceObject[] = await this.execute(params);
            // const menuEntityList = menuList.map(MenuMapperDTO.convertFromPersistenceObject);
            
            const operationList: OperationPersistenceObject[] = await this.findOperations(criteria);
            const list = this.convertToEntityMenu(operationList)
            console.log(list)
            return [];
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }

    private async findOperations(criteria: Criteria) {
        const domainfilters = this.criteriaConverter.convert(criteria);
        const persistenceFilters = this.convertToPersistenceFilters(domainfilters);
        const tvp_filters = this.createTVPTable(
            persistenceFilters,
            'tvp_gestion_ml_db_filtro_criterio_solicitud',
            TVPSchemeFilters
        )
        const params: dbParameters[] = [
            { name: 'entidad', type: sql.VarChar, value: 'vw_gestion_ml_db_plataformas_operaciones' },
            { name: 'filtros', type: sql.TVP, value: tvp_filters },
        ]
        return await this.execute(params);
    }

    private convertToEntityMenu(list: OperationPersistenceObject[]): MenuContainerForOperations[] {
        let menuList: MenuContainerForOperations[] = [];
        list.forEach(entry => {
            if (menuList.find(element => element.id.value === entry.mnu_id) === undefined) {
                menuList = [
                    ...menuList,
                    MenuContainerForOperations.fromPrimitives(
                        new MenuContainerForOperationsDTO(
                            entry.mnu_id,
                            entry.menu,
                            true,
                            list.filter(operation => operation.mnu_id === entry.mnu_id).
                                map(entity =>
                                    new OperationDTO(
                                        entity.ope_id,
                                        entity.ptf_id,
                                        entity.prf_id,
                                        entity.operacion,
                                        true
                                    )
                                )
                        )
                    )
                ]
            }

        })
        return menuList;
    }
}