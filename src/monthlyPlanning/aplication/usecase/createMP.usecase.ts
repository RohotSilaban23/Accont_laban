import { Inject, Injectable } from "@nestjs/common";
import { MP_REPO } from "src/monthlyPlanning/domain/repositories/tokenMP.repositori";
import { v4 as uuid } from 'uuid';
import { MonthlyPlanningRepository } from "src/monthlyPlanning/domain/repositories/monthlyPlanning.repostori";
import { MonthlyPlanning } from "src/monthlyPlanning/domain/entities/monthlyPlanning.entity";
import { ItemRepository } from "src/items/domain/repositories/item.repository";
import { ITEM_REPO } from "src/items/domain/repositories/itemToken.repositori";

@Injectable()
export class CreateMP{
    constructor(
        @Inject(MP_REPO)
        private readonly mpRepo: MonthlyPlanningRepository,
        @Inject(ITEM_REPO)
        private readonly item: ItemRepository
    ){}

    async execute(
        itemId: string,
        name: string,
        amount: number,
        tanggal: Date,
    ){
    
    // const data = await this.mpRepo.findByName(name);

    // if(data){
    //     throw new Error("Item Already Exist!")
    // }
    const dataItem = await this.item.findById(itemId)
    if (!dataItem || dataItem.price === undefined) {
              throw new Error('Item not found or price not set');
        }
    const totalHarga = dataItem?.price * amount;
    const tanggalConvert = new Date(tanggal);

    const mp = new MonthlyPlanning(
        uuid(),
        itemId,
        name,
        amount,
        totalHarga,
        tanggalConvert,
    );

    await this.mpRepo.save(mp);

    return(mp);
    }
}