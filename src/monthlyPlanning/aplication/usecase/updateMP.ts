import { Inject, Injectable } from "@nestjs/common";
import { ItemRepository } from "src/items/domain/repositories/item.repository";
import { ITEM_REPO } from "src/items/domain/repositories/itemToken.repositori";
import { MonthlyPlanningRepository } from "src/monthlyPlanning/domain/repositories/monthlyPlanning.repostori";
import { MP_REPO } from "src/monthlyPlanning/domain/repositories/tokenMP.repositori";

@Injectable()
export class UpdatePM{
    constructor(
        @Inject(MP_REPO)
        private readonly mpRepo: MonthlyPlanningRepository,
         @Inject(ITEM_REPO)
        private readonly item: ItemRepository,
    ){}

    async execute(
        id: string,
        itemId: string,
        name: string, 
        amount: number, 
        tanggal: Date
    ){
    
    const data = await this.mpRepo.findById(id);
    if(!data){
        throw new Error("Data no Exist!!")
    }
    const dataItem = await this.item.findById(itemId)
    if (!dataItem || dataItem.price === undefined) {
            throw new Error('Item not found or price not set');
        }
    const totalHarga = dataItem?.price * amount;
    const tanggalConvert = new Date(tanggal);

    data.update(name, amount, totalHarga, tanggalConvert);

    return this.mpRepo.save(data);
    }
}