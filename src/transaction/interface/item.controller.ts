import { Body, Controller, Delete, Post, Put, Query } from "@nestjs/common";
import { CreateItem } from "../aplication/createItem.usecase";
import { FindItemByType } from "../aplication/findIitemByProduct.usecase";
import { ItemType } from "../domain/entities/item-type.enum";
import { DeleteItem } from "../aplication/itemDelete.usecase";
import { UpdateItem } from "../aplication/updateitem.usecase";

@Controller("items")
export class ItemController{
    constructor(
        private readonly createItem: CreateItem,
        private readonly findItemByType: FindItemByType,
        private readonly itemDelete: DeleteItem,
        private readonly itemUpdate: UpdateItem,
    ){}

    @Post("create-item")
    async create(@Body() dto: any) {
         return this.createItem.execute(dto.name, dto.type, dto.price);
    }

    @Post("find-item-by-type")
    async findByitem(@Body("type") type: ItemType){
        return this.findItemByType.execute(type);
    }

    @Delete("delete-item")
    async deleteItem(@Query("id") id: string){
        return this.itemDelete.execute(id);
    }

    @Put("update-item")
    async updateItem(
        @Query("id") id: string,
        @Body() dto: any){
        return this.itemUpdate.execute(id, dto.name, dto.type, dto.price);
    }
}