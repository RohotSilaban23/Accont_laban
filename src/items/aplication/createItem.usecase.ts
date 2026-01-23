import { Inject, Injectable } from "@nestjs/common";
import { ITEM_REPO } from "../domain/repositories/itemToken.repositori";
import { v4 as uuid } from 'uuid';
import { ItemRepository } from "../domain/repositories/item.repository";
import { ItemType } from "../domain/entities/item-type.enum";
import { Item } from "../domain/entities/item.entity";

@Injectable()
export class CreateItem{
    constructor(
        @Inject(ITEM_REPO)
        private readonly itemRepo: ItemRepository,
    ){}

    async execute(
        name: string,
        type: ItemType,
        price: number
    ){
    
    const data = await this.itemRepo.findByName(name);

    if(data){
        throw new Error("Item Already Exist!")
    }
    
    const item = new Item(
        uuid(),
        name,
        type,
        price,
    );

    await this.itemRepo.save(item);

    return(item);
    }
}