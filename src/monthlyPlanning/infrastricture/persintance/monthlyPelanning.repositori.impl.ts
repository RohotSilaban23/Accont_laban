import { Injectable } from "@nestjs/common";
import { ItemRepository } from "src/items/domain/repositories/item.repository";
import { MonthlyPlanning } from "src/monthlyPlanning/domain/entities/monthlyPlanning.entity";
import { MonthlyPlanningRepository } from "src/monthlyPlanning/domain/repositories/monthlyPlanning.repostori";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class MonthlyPlanningRepositoriImpl implements MonthlyPlanningRepository {
    constructor(
        private readonly prisma: PrismaService,
      
    ){}

    async save(monthlyPlanning: MonthlyPlanning): Promise<void> {

         await this.prisma.monthlyPlanning.upsert({
            where: { id: monthlyPlanning.id },
                update: {
                    name: monthlyPlanning.name,
                    amount: monthlyPlanning.amount,
                    totalPrice: monthlyPlanning.totalPrice,
                    tanggal: monthlyPlanning.tanggal
                },
                create: {
                    id: monthlyPlanning.id,
                    name: monthlyPlanning.name,
                    itemId: monthlyPlanning.itemId,
                    amount: monthlyPlanning.amount,
                    totalPrice: monthlyPlanning.totalPrice,
                    tanggal: monthlyPlanning.tanggal
                },
        })
    }

    async findById(id: string): Promise<MonthlyPlanning | null> {
        const data = await this.prisma.monthlyPlanning.findUnique({
                    where: { id },
            });
        
        if (!data) return null;
        
        return new MonthlyPlanning(
            data.id,
            data.itemId,
            data.name,
            data.amount,
            data.totalPrice,
            data.tanggal
        );
        
    }

    async findByDate(tanggal: Date): Promise<MonthlyPlanning[]> {
        const rows = await this.prisma.monthlyPlanning.findMany({
            where: {
                tanggal,
            },
        });

        return rows.map(
            (data) =>
                new MonthlyPlanning(
                    data.id,
                    data.itemId,
                    data.name,
                    data.amount,
                    data.totalPrice,
                    data.tanggal,
                    data.createdAt,
                    data.updatedAt,
                ),
            );
    }

    async findByall(): Promise<MonthlyPlanning[]> {
        const rows = await this.prisma.monthlyPlanning.findMany({});
        
        return rows.map(
            (data) =>
                new MonthlyPlanning(
                    data.id,
                    data.itemId,
                    data.name,
                    data.amount,
                    data.totalPrice,
                    data.tanggal,
                    data.createdAt,
                    data.updatedAt,
                ),
            );
        
    }

    async delete(id: string): Promise<void> {
        await this.prisma.monthlyPlanning.delete({
            where: { id },
        });
    }
}