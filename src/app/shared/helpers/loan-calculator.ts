export function loanCalculator(loanAmount: number, loanTenor: number, interestRate: number): RepaymentSchedule[] {
    let result: RepaymentSchedule[] = [];
    let totalPaid = 0;
    let now = new Date();
		
    for(var i = 1; i <= loanTenor; i++) {
        let balance = loanAmount - totalPaid;
        let monthlyInterest = interestRate / 100;
        let interestAmount = monthlyInterest * balance;
        let principalAmount = loanAmount / loanTenor;
        let totalAmount = principalAmount + interestAmount;
        totalPaid = totalPaid + principalAmount;

        let repayment: RepaymentSchedule = {
            month: i,
            interestRate: Math.round((interestRate + Number.EPSILON) * 100) / 100,
            principalAmount: Math.round((principalAmount + Number.EPSILON) * 100) / 100,
            interestAmount: Math.round((interestAmount + Number.EPSILON) * 100) / 100,
            totalPayment: Math.round((totalAmount + Number.EPSILON) * 100) / 100,
            balance: Math.round((totalPaid + Number.EPSILON) * 100) / 100,
            date: new Date(now.setMonth(now.getMonth() + i))
        }
        result.push(repayment);
    }
    
    return result;
}

export class RepaymentSchedule {
    month: number;
    public date: Date;
    principalAmount: number;
    interestAmount: number;
    interestRate: number;
    totalPayment: number;
    balance: number;
}
