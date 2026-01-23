import { ItemType } from "./item-type.enum";

export class Item{
    constructor (
        public readonly id: string,
        private _name: string,
        private _type: ItemType,
        private _price: number,
        private readonly _createdAt: Date = new Date(),
        private _updatedAt: Date = new Date(),
    ){ this.validate}

     get name(): string {
        return this._name;
    }

    get type(): ItemType {
        return this._type;
    }

    get price(): number {
        return this._price;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }


    private validate() {
        if (!this._name || this._name.trim().length < 3) {
            throw new Error('Item name must be at least 3 characters');
        }

        if (this._price <= 0) {
            throw new Error('Price must be greater than zero');
        }
    }

    update(name: string, type: ItemType, price: number) {
        this._name = name;
        this._type = type;
        this._price = price;
        this._updatedAt = new Date();
    }

}