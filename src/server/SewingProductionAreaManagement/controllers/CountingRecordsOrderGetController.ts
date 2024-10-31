import { Request, Response } from "express";
import { QueryBus } from "../../../contexts/Shared/domain/CQRS/QueryBus";
import { Controller } from "../../Shared/Controller";
import { CountingRecordsOrderResponse } from "../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/SearchByCriteria/CountingRecordsOrderResponse";
import { SearchCountingRecordsOrderByCriteriaQuery } from "../../../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/SearchByCriteria/SearchCountingRecordsOrderByCriteriaQuery";
import { ApiResponse } from "../../Shared/ApiResponse";

export class CountingRecordsOrderGetController implements Controller {
    constructor(private readonly queryBus: QueryBus) { }

    async execute(req: Request, res: Response): Promise<void> {
        const { query: queryParams } = req;
        const { modulo, limit, offset } = queryParams;

        if(!modulo) throw new Error('No se obtuvo los campos necesarios');

        const query = new SearchCountingRecordsOrderByCriteriaQuery(
            [
                new Map([
                    ['field', 'mdl_id'],
                    ['operator', '='],
                    ['value', modulo.toString()]
                ])
            ],
            'desc',
            'fecha_creacion',
            limit ? Number(limit) : undefined,
            offset ? Number(offset) : undefined
        )

        const response = await this.queryBus.ask<CountingRecordsOrderResponse[]>(query);
        const apiResponse: ApiResponse =  {
            data: response
        }
        res.status(200).json(apiResponse)
    }
}