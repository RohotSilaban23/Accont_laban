import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ItemType } from "src/items/domain/entities/item-type.enum";
import { Item } from "src/items/domain/entities/item.entity";
import { ItemRepository } from "src/items/domain/repositories/item.repository";

@Injectable()
export class ItemRepositoryImpl implements ItemRepository{
    constructor(private readonly prisma: PrismaService){}

    async save(item: Item): Promise<void> {
        await this.prisma.item.upsert({
            where: { id: item.id },
                update: {
                    name: item.name,
                    type: item.type,
                    price: item.price,
                },
                create: {
                    id: item.id,
                    name: item.name,
                    type: item.type,
                    price: item.price,
                },
        })
    }

    async findById(id: string): Promise<Item | null> {
        const data = await this.prisma.item.findUnique({
            where: { id },
        });

        if (!data) return null;

        return new Item(
            data.id,
            data.name,
            data.type as ItemType,
            data.price,
        );
    }

    async findByall(): Promise<Item[]> {
        const rows = await this.prisma.item.findMany({})

         return rows.map(
        (data) =>
            new Item(
                data.id,
                data.name,
                data.type as ItemType,
                data.price,
                data.createdAt,
                data.updatedAt,
            ),
        );
    }

    async delete(id: string): Promise<void> {
        await this.prisma.item.delete({
        where: { id },
        });
    }

    async findByType(type: ItemType): Promise<Item[]> {
        const rows = await this.prisma.item.findMany({
            where: {
            type,
            },
        });

        return rows.map(
            (data) =>
                new Item(
                    data.id,
                    data.name,
                    data.type as ItemType,
                    data.price,
                    data.createdAt,
                    data.updatedAt,
                ),
            );
        }

    async findByName(name: string): Promise<Item | null> {
         const data = await this.prisma.item.findFirst({
            where: { name }
        });

        if (!data) return null;

        return new Item(
            data.id,
            data.name,
            data.type as ItemType,
            data.price,
        );
        
    }


}