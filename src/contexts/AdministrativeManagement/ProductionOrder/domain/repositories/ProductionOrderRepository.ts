
export interface ProductionOrderRepository {
    find(): any;
    save(): Promise<void>
}