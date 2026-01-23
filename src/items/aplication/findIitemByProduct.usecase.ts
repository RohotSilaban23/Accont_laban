import { Inject, Injectable } from "@nestjs/common";
import { ITEM_REPO } from "../domain/repositories/itemToken.repositori";
import { ItemRepository } from "../domain/repositories/item.repository";
import { ItemType } from "../domain/entities/item-type.enum";

@Injectable()
export class FindItemByType{
    constructor(
        @Inject(ITEM_REPO)
        private readonly itemRepo: ItemRepository,
    ){}

    async execute(type: ItemType,){
    
    const data = await this.itemRepo.findByType(type);
    if(!data){
        throw new Error("Data no Exist!!")
    }

    return(data);
    }
}