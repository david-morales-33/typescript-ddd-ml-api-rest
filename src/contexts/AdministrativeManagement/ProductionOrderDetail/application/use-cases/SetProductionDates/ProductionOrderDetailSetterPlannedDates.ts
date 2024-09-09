import { CommonModificationEvent } from "../../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../AdministrativeEvent/domain/value-objects/EventCreateDate";
import { EventDescription } from "../../../../AdministrativeEvent/domain/value-objects/EventDescription";
import { EventId } from "../../../../AdministrativeEvent/domain/value-objects/EventId";
import { EventModifiedField } from "../../../../AdministrativeEvent/domain/value-objects/EventModifiedField";
import { EventNewValue } from "../../../../AdministrativeEvent/domain/value-objects/EventNewValue";
import { EventPreviusValue } from "../../../../AdministrativeEvent/domain/value-objects/EventPreviusValue";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionOrderProcessEndDatePlanned } from "../../../../ProductionOrder/domain/value-objects/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../../ProductionOrder/domain/value-objects/ProductionOrderProcessStartDatePlanned";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { ProductionOrderDetailCommandRepository } from "../../../domain/repositories/ProductionOrderDetailCommandRepository";
import { ProductionOrderDetailQueryRepository } from "../../../domain/repositories/ProductionOrderDetailQueryRepository";
import { ProductionOrderDetailId } from "../../../domain/value-objects/ProductionOrderDetailId";
import { ProductionOrderDetailNotFoundException } from "../../exceptions/ProductionOrderDetailNotFoundException";

export class ProductionOrderDetailSetterPlannedDates {
    constructor(
        private productionOrderQueryRepository: ProductionOrderDetailQueryRepository,
        private productionOrderCommandRepository: ProductionOrderDetailCommandRepository,
    ) { }

    async execute(params: {
        productionOrderDetailId: ProductionOrderDetailId,
        processStartDatePlanned: ProductionOrderProcessStartDatePlanned,
        processEndDatePlanned: ProductionOrderProcessEndDatePlanned,
        productionModuleId: ProductionModuleId,
        setBy: UserId
    }) {

        const { productionOrderDetailId, processEndDatePlanned, processStartDatePlanned, productionModuleId, setBy } = params;

        const productionOrderDetail = await this.productionOrderQueryRepository.find(productionOrderDetailId);

        if (productionOrderDetail === null)
            throw new ProductionOrderDetailNotFoundException(productionOrderDetailId);

        const setStartPlannedDateEvent = CommonModificationEvent.create(
            new EventId(0),
            setBy,
            new EventCreateDate(new Date()),
            new EventDescription('Asignación de fecha de inicio'),
            new EventModifiedField('Fecha de inicio planeada'),
            new EventPreviusValue('No asignado'),
            new EventNewValue(processStartDatePlanned.value.toDateString())
        );

        const setEndPlannedDateEvent = CommonModificationEvent.create(
            new EventId(0),
            setBy,
            new EventCreateDate(new Date()),
            new EventDescription('Asignación de fecha de finalización'),
            new EventModifiedField('Fecha de final planeada'),
            new EventPreviusValue('No asignado'),
            new EventNewValue(processEndDatePlanned.value.toDateString())
        );

        const setProductionModulePlannedEvent = CommonModificationEvent.create(
            new EventId(0),
            setBy,
            new EventCreateDate(new Date()),
            new EventDescription('Asignación de módulo para ejecución de suborden'),
            new EventModifiedField('Módulo para ejecución de suborden'),
            new EventPreviusValue('No asignado'),
            new EventNewValue(processEndDatePlanned.value.toDateString())
        );

        productionOrderDetail.updateProcessStartDatePlanned({
            value: processStartDatePlanned,
            event: setStartPlannedDateEvent
        });

        productionOrderDetail.updateProcessEndDatePlanned({
            value: processEndDatePlanned,
            event: setEndPlannedDateEvent
        });

        productionOrderDetail.updateProductionModulePlanned({
            value: productionModuleId,
            event: setProductionModulePlannedEvent
        })

        await this.productionOrderCommandRepository.save(productionOrderDetail);
    }
}