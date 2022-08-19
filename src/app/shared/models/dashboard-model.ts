export class DashboardModel {
    public totalUsers: number;
    public totalConsultations: number;
    public successfulPayments: PaymentStatModel;
    public failedPayments: PaymentStatModel;
    public abandonedPayments: PaymentStatModel;
    public revenue: Revenue;
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
