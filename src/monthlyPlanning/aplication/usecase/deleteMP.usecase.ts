import { Inject, Injectable } from "@nestjs/common";
import { MonthlyPlanningRepository } from "src/monthlyPlanning/domain/repositories/monthlyPlanning.repostori";
import { MP_REPO } from "src/monthlyPlanning/domain/repositories/tokenMP.repositori";

@Injectable()
export class DeletePM{
    constructor(
        @Inject(MP_REPO)
        private readonly mpRepo: MonthlyPlanningRepository,
    ){}

    async execute(id: string){
    const data = await this.mpRepo.delete(id);
    return(data);
    }
}