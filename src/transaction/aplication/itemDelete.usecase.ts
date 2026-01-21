import { Inject, Injectable } from "@nestjs/common";
import { ITEM_REPO } from "../domain/repositories/itemToken.repositori";
import { ItemRepository } from "../domain/repositories/item.repository";
import { ItemType } from "../domain/entities/item-type.enum";

@Injectable()
export class DeleteItem{
    constructor(
        @Inject(ITEM_REPO)
        private readonly itemRepo: ItemRepository,
    ){}

    async execute(id: string){
    const data = await this.itemRepo.delete(id);
    return(data);
    }
}