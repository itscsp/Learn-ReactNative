export class Transaction {
    constructor(id, date, type, description, category, amount) {
        this.id = id;
        this.date = date;
        this.type = type;
        this.description = description;
        this.category = category;
        this.amount = amount;
    }
}