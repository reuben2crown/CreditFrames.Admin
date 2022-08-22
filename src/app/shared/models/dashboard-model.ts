import { LoanModel } from "./loan-model";
import { SearchHistoryModel } from "./search-history-model";

export class AdminDashboardModel {
    public totalLoans: number;
    public totalUsers: number;
    public activeUsers: number;
    public activeSearch: number;
    public revenue: Revenue;
    public recentSearch: SearchHistoryModel[] = [];
    public recentLoans: LoanModel[] = [];
    // public abandonedPayments: PaymentStatModel;
}

export class Revenue {
    public today: PaymentStatModel;
    public thisWeek: PaymentStatModel;
    public thisMonth: PaymentStatModel;
}

export class PaymentStatModel {
    public total: number;
    public amount: number;
}

export class ChartModel {
    public label: string;
    public value: number;
}
