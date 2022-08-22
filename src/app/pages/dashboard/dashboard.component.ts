import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as G2 from '@antv/g2';
import { ChartModel, CommonService, AdminDashboardModel, DashboardService } from 'src/app/shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  model: AdminDashboardModel;
  loading: boolean;

  constructor(private cdr: ChangeDetectorRef, private dashboardService: DashboardService, private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getDashBoard();
  }

  getDashBoard() {
    this.commonService.showLoading();
    this.loading = true;
    this.dashboardService.getDashboard().subscribe(result => {
      this.model = result;
      this.loading = false;
      this.commonService.hideLoading();
      this.loadChart();
    }, error => {
      this.loading = false;
      this.commonService.handleError(error);
    });
  }

  loadChart() {
    if (this.model && this.model.revenue) {
      const chart = new G2.Chart({
        container: 'g2-chart', // Specify the chart container ID
        // width: 500, // Specify chart width
        height: 300, // Specify chart height
        autoFit: true
      });

      // Step 2: Load the data source
      var chartData: ChartModel[] = [];
      chartData.push({
        label: 'Today',
        value: this.model.revenue.today?.amount || 0
      });
      chartData.push({
        label: 'This Week',
        value: this.model.revenue.thisWeek?.amount || 0
      });
      chartData.push({
        label: 'This Month',
        value: this.model.revenue.thisMonth?.amount || 0
      });
      chart.data(chartData);
      // Step 3: Create a graphic grammar, draw a histogram, determine the position of the graphic by the two attributes of genre and sold, map genre to the x axis, and sell to the y axis
      chart.interval()
        .position('label*value')
        .color('label');
      // Step 4: Render the chart
      chart.render();
    }
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }
}
