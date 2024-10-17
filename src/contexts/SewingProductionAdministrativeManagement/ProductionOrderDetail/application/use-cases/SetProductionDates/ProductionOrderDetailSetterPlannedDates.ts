import { Uuid } from "../../../../../Shared/domain/value-object/Uuid";
import { CommonModificationEvent } from "../../../../../Shared/domain/entities/CommonModificationEvent";
import { EventCreateDate } from "../../../../../Shared/domain/value-object/EventCreateDate";
import { EventDescription } from "../../../../../Shared/domain/value-object/EventDescription";
import { EventId } from "../../../../../Shared/domain/value-object/EventId";
import { EventModifiedField } from "../../../../../Shared/domain/value-object/EventModifiedField";
import { EventNewValue } from "../../../../../Shared/domain/value-object/EventNewValue";
import { EventPreviusValue } from "../../../../../Shared/domain/value-object/EventPreviusValue";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionOrderProcessEndDatePlanned } from "../../../../../Shared/domain/value-object/ProductionOrderProcessEndDatePlanned";
import { ProductionOrderProcessStartDatePlanned } from "../../../../../Shared/domain/value-object/ProductionOrderProcessStartDatePlanned";
import { ProductionOrderDetailCommandRepository } from "../../../domain/repositories/ProductionOrderDetailCommandRepository";
import { ProductionOrderDetailQueryRepository } from "../../../domain/repositories/ProductionOrderDetailQueryRepository";
import { ProductionOrderDetailId } from "../../../domain/value-objects/ProductionOrderDetailId";
import { ProductionOrderDetailNotFoundException } from "../../exceptions/ProductionOrderDetailNotFoundException";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

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
            new EventId(Uuid.random().value),
            setBy,
            new EventCreateDate(new Date()),
            new EventDescription('Asignación de fecha de inicio'),
            new EventModifiedField('Fecha de inicio planeada'),
            new EventPreviusValue('No asignado'),
            new EventNewValue(processStartDatePlanned.value.toDateString())
        );

        const setEndPlannedDateEvent = CommonModificationEvent.create(
            new EventId(Uuid.random().value),
            setBy,
            new EventCreateDate(new Date()),
            new EventDescription('Asignación de fecha de finalización'),
            new EventModifiedField('Fecha de final planeada'),
            new EventPreviusValue('No asignado'),
            new EventNewValue(processEndDatePlanned.value.toDateString())
        );

        const setProductionModulePlannedEvent = CommonModificationEvent.create(
            new EventId(Uuid.random().value),
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