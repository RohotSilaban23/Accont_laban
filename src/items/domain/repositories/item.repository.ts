import { Item } from "../entities/item.entity";

export abstract class ItemRepository {
    abstract save(item: Item): Promise<void>;
    abstract findById(id: string): Promise<Item | null>;
    abstract findByName(name: string): Promise<Item | null>;
    abstract findByall(): Promise<Item[]>;
    abstract delete(id: string): Promise<void>;
    abstract findByType(type: string): Promise<Item[]>;
}