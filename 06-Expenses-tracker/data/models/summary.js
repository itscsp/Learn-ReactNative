export class Summary {
    constructor(
        id,
        month,
        income,
        expenses,
        loan,
        net
    ) {
        this.id = id;
        this.month = month;
        this.income = income;
        this.expenses = expenses;
        this.loan = loan;
        this.net = net;
    }
}

export default Summary;