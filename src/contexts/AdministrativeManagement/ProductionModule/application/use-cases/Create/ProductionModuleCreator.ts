import { CommonCreationEvent } from "../../../../AdministrativeEvent/domain/entities/CommonCreationEvent";
import { EventCreateDate } from "../../../../AdministrativeEvent/domain/value-objects/EventCreateDate";
import { EventDescription } from "../../../../AdministrativeEvent/domain/value-objects/EventDescription";
import { EventId } from "../../../../AdministrativeEvent/domain/value-objects/EventId";
import { ProductionModule } from "../../../domain/entities/productionModule";
import { ProductionModuleCommandRepository } from "../../../domain/repositories/ProductionModuleCommandRepository";
import { ProductionModuleCreateBy } from "../../../domain/value-objects/ProductionModuleCreateBy";
import { ProductionModuleCreationDate } from "../../../domain/value-objects/ProductionModuleCreationDate";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { ProductionModuleLabel } from "../../../domain/value-objects/ProductionModuleLabel";
import { ProductionModuleMachineAmount } from "../../../domain/value-objects/ProductionModuleMachineAmount";

export class ProductionModuleCreator {
    constructor(private productionModuleRepository: ProductionModuleCommandRepository) { }

    async execute(params: {
        productionModuleId: ProductionModuleId,
        machineAmount: ProductionModuleMachineAmount,
        createBy: ProductionModuleCreateBy,
    }) {
        const { productionModuleId, machineAmount, createBy } = params;

        const eventId = new EventId(1);
        const creationDate = new EventCreateDate(new Date());
        const eventDescription = new EventDescription('Integración de módulo');

        const creationEvent = CommonCreationEvent.create(
            eventId,
            createBy,
            creationDate,
            eventDescription
        );

        const productionModuleLabel = new ProductionModuleLabel(`MODULO-${productionModuleId.value.toString()}`);
        const productionModulecreationDate = new ProductionModuleCreationDate(new Date());

        const productionModule = ProductionModule.create(
            productionModuleId,
            productionModuleLabel,
            machineAmount,
            null,
            productionModulecreationDate,
            createBy,
            [creationEvent]
        )

        await this.productionModuleRepository.save(productionModule);
    }
}