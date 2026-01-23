import { MonthlyPlanning } from "../entities/monthlyPlanning.entity";

export abstract class MonthlyPlanningRepository {
    abstract save(monthlyPlanning: MonthlyPlanning): Promise<void>;
    abstract findById(id: string): Promise<MonthlyPlanning | null>;
    abstract findByall(): Promise<MonthlyPlanning[]>;
    abstract delete(id: string): Promise<void>;
    abstract findByDate(tanggal: Date): Promise<MonthlyPlanning[]>;
}