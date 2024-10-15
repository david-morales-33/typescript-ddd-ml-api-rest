
export class OperationDTO {
    constructor(
        readonly operationId: number,
        readonly menuId: number,
        readonly platformId: number,
        readonly profileId: number,
        readonly label: string,
        readonly state: boolean
    ) { }
}