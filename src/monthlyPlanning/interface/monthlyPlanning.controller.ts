import { Body, Controller, Delete, Post, Put, Query } from "@nestjs/common";
import { CreateMP } from "../aplication/usecase/createMP.usecase";
import { FindByDate } from "../aplication/usecase/findByDateMP.usecase";
import { DeletePM } from "../aplication/usecase/deleteMP.usecase";
import { UpdatePM } from "../aplication/usecase/updateMP";


@Controller("monthly-planning")
export class MonthlyPlanningController{
    constructor(
        private readonly createMP: CreateMP,
        private readonly findDate: FindByDate,
        private readonly deleteMonthlyPlanning: DeletePM,
        private readonly updateMonthlyPlanning: UpdatePM,
     
    ){}

    @Post("create-MP")
    async create(@Body() dto: any) {
         return this.createMP.execute(dto.itemId, dto.name, dto.amount, dto.tanggal);
    }

    @Post("find-by-date")
    async findByDate(@Body("tanggal") tanggal: Date){
        return this.findDate.execute(tanggal);
    }

    @Delete("delete-MP")
    async DeletePM(@Query("id") id: string){
        return this.deleteMonthlyPlanning.execute(id);
    }

    @Put("update-MP")
    async updateMp(
        @Query("id") id: string,
        @Body() dto: any,
    ) {
        return this.updateMonthlyPlanning.execute(
            id,
            dto.itemId,
            dto.name,
            dto.amount,
            dto.tanggal
        )
    }
        

}