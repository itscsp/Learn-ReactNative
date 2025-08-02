export class Summary {
    constructor(
        id,
        month,
        income,
        expenses,
        loan,
        net,
        sign = null // initially null
    ) {
        this.id = id;
        this.month = month;
        this.income = income;
        this.expenses = expenses;
        this.loan = loan;
        this.net = net;
        // Automatically set sign if not explicitly provided
        this.sign = sign !== null ? sign : net >= 0;
    }
}

export default Summary;
