import { Inject, Injectable } from "@nestjs/common";
import { ITEM_REPO } from "../domain/repositories/itemToken.repositori";
import { ItemRepository } from "../domain/repositories/item.repository";
import { ItemType } from "../domain/entities/item-type.enum";
import { Item } from "../domain/entities/item.entity";

@Injectable()
export class UpdateItem{
    constructor(
        @Inject(ITEM_REPO)
        private readonly itemRepo: ItemRepository,
    ){}

    async execute(
        id: string,
        name: string, 
        type: ItemType, 
        price: number
    ){
    
    const data = await this.itemRepo.findById(id);
    if(!data){
        throw new Error("Data no Exist!!")
    }

    data.update(name, type, price);

    return this.itemRepo.save(data);
    }
}