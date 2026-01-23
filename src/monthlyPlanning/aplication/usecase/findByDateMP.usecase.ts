import { Inject, Injectable } from "@nestjs/common";
import { MonthlyPlanningRepository } from "src/monthlyPlanning/domain/repositories/monthlyPlanning.repostori";
import { MP_REPO } from "src/monthlyPlanning/domain/repositories/tokenMP.repositori";

@Injectable()
export class FindByDate{
    constructor(
        @Inject(MP_REPO)
        private readonly pmRepo: MonthlyPlanningRepository,
    ){}

    async execute(tanggal: Date){
    const tanggalConvert = new Date(tanggal)
    const data = await this.pmRepo.findByDate(tanggalConvert);
    if(!data){
        throw new Error("Data no Exist!!")
    }

    return(data);
    }
}