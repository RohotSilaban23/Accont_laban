export class MonthlyPlanning{
    constructor (
        public readonly id: string,
        public readonly itemId: string,
        private _name: string,
        private _amount : number,
        private _totalPrice: number,
        private _tanggal: Date,
        private readonly _createdAt: Date = new Date(),
        private _updatedAt: Date = new Date(),
    ){ this.validate}

     get name(): string {
        return this._name;
    }

    get amount(): number {
        return this._amount;
    }

    get totalPrice(): number {
        return this._totalPrice;
    }

     get tanggal(): Date {
        return this._tanggal;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }


    private validate() {
        if (!this._name || this._name.trim().length < 3) {
            throw new Error('Item name must be at least 3 characters');
        }
    }

    update(name: string, amount: number, totalPrice: number, tanggal: Date) {
        this._name = name;
        this._amount = amount;
        this._totalPrice = totalPrice;
        this._tanggal = tanggal
        this._updatedAt = new Date();
    }

}