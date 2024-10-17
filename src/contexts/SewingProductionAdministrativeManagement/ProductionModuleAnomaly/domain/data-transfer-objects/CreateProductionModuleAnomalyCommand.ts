import { Command } from "../../../../Shared/domain/Command";

type params = {
    createBy: string;
    productionModuleAnomalyId: string;
    productionModuleAnomalyName: string;
}

export class CreateProductionModuleAnomalyCommand extends Command {

    public readonly createBy: string;
    public readonly productionModuleAnomalyId: string;
    public readonly productionModuleAnomalyName: string;
    
    constructor({
        createBy,
        productionModuleAnomalyId,
        productionModuleAnomalyName
    }: params) {
        super();
        this.createBy = createBy;
        this.productionModuleAnomalyId = productionModuleAnomalyId;
        this.productionModuleAnomalyName = productionModuleAnomalyName;
    }
}