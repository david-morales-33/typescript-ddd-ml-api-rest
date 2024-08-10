
export interface ProductionModuleRepository {
    save(): Promise<void>;
    find(): Promise<any>;
    searchAll(): Promise<any[]>;
    matching(): Promise<any[]>;
}