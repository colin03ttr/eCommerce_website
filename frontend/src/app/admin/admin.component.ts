import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserSettingsService } from '../user-settings.service';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { WatchDTO } from '../DTOs/watchDTO';
import { OrderDTO } from '../DTOs/orderDTO';
import { UserDTO } from '../DTOs/userDTO';
import { watchService } from '../watch.service';
import { userService } from '../user.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HighchartsChartModule, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private readonly userSettingsService = inject(UserSettingsService);
  private readonly watchservice = inject(watchService);
  private readonly cartService = inject(CartService);
  private readonly userService = inject(userService);

  watchesDTO: WatchDTO[] = [];
  ordersDTO: OrderDTO[] = [];
  usersDTO: UserDTO[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  priceRangeChartOptions: Highcharts.Options | undefined;
  brandDistributionChartOptions: Highcharts.Options | undefined;
  topSpendersChartOptions: Highcharts.Options | undefined;
  orderPriceChartOptions: Highcharts.Options | undefined;

  ngOnInit(): void {
    this.userSettingsService.isSessionActive();

    // Load watches data
    this.watchservice.getWatchesDTO().subscribe({
      next: (data) => {
        this.watchesDTO = data;
        this.initializeWatchCharts();
      },
      error: (err) => {
        console.error('Failed to load watches:', err);
      },
    });

    // Load orders data
    this.cartService.getOrders().subscribe({
      next: (data) => {
        this.ordersDTO = data;
        this.initializeOrderCharts();
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
      },
    });

    // Load users data and initialize charts
    this.userService.getusersDTO().subscribe({
      next: (data) => {
        this.usersDTO = data;

        const userOrderSummaries = this.usersDTO.map((user) =>
          this.userService.getUserOrderSummary(user.id).toPromise().then((summary) => {
            if(summary){
              user.numberOfOrders = summary.count;
              user.totalSpent = summary.total;
            }
            return user;
          })
        );

        Promise.all(userOrderSummaries).then((updatedUsers) => {
          this.usersDTO = updatedUsers;
          this.initializeUsersCharts(); // Initialize the users chart after data is loaded
        });
      },
      error: (err) => {
        console.error('Error loading users', err);
      },
    });
  }

  private initializeWatchCharts(): void {
    // Price range distribution
    const priceRanges = [0, 0, 0, 0, 0, 0];
    this.watchesDTO.forEach((watch) => {
      const price = watch.price;
      if (price >= 10 && price <= 50) {
        priceRanges[0]++;
      } else if (price >= 51 && price <= 250) {
        priceRanges[1]++;
      } else if (price >= 251 && price <= 500) {
        priceRanges[2]++;
      } else if (price >= 501 && price <= 2000) {
        priceRanges[3]++;
      } else if (price >= 2001 && price <= 10000) {
        priceRanges[4]++;
      } else if (price > 10000) {
        priceRanges[5]++;
      }
    });

    this.priceRangeChartOptions = {
      chart: { type: 'column' },
      title: { text: 'Distribution of Watches by Price Range' },
      xAxis: {
        categories: ['10 to 50', '51 to 250', '251 to 500', '501 to 2000', '2001 to 10000', '10001 and more'],
        title: { text: 'Price Ranges ($)' },
      },
      yAxis: {
        min: 0,
        title: { text: 'Number of Watches' },
      },
      series: [
        {
          name: 'Watches',
          data: priceRanges,
          type: 'column',
          colorByPoint: true,
        },
      ],
      credits: { enabled: false },
    };

    // Brand distribution
    const brandCounts: { [brand: string]: number } = {};
    this.watchesDTO.forEach((watch) => {
      brandCounts[watch.brand] = (brandCounts[watch.brand] || 0) + 1;
    });

    this.brandDistributionChartOptions = {
      chart: { type: 'pie' },
      title: { text: 'Brand Distribution' },
      series: [
        {
          name: 'Watches',
          data: Object.entries(brandCounts).map(([brand, count]) => ({ name: brand, y: count })),
          type: 'pie',
        },
      ],
      credits: { enabled: false },
    };
  }

  private initializeOrderCharts(): void {
    // Order total price distribution chart
    const priceData = this.ordersDTO.map((order) => ({
      x: new Date(order.createdAt).getTime(),
      y: order.totalPrice,
    }));

    this.orderPriceChartOptions = {
      chart: { type: 'scatter' },
      title: { text: 'Order Total Prices Over Time' },
      xAxis: { type: 'datetime', title: { text: 'Date' } },
      yAxis: { title: { text: 'Total Price ($)' } },
      series: [{ name: 'Orders', data: priceData, type: 'scatter' }],
      credits: { enabled: false },
    };

    // Top spenders podium chart
    const userSpentMap: { [userId: number]: { name: string; totalSpent: number } } = {};

    this.ordersDTO.forEach((order) => {
      const user = order.user;
      if (user) {
        if (!userSpentMap[user.id]) {
          userSpentMap[user.id] = { name: user.name, totalSpent: 0 };
        }
        userSpentMap[user.id].totalSpent += order.totalPrice;
      }
    });

    const topUsers = Object.values(userSpentMap)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 3);

    this.topSpendersChartOptions = {
      chart: { type: 'column' },
      title: { text: 'Top 3 Spenders' },
      xAxis: {
        categories: topUsers.map((user) => user.name),
        title: { text: 'Users' },
      },
      yAxis: {
        title: { text: 'Total Spent ($)' },
      },
      series: [
        {
          name: 'Total Spent',
          data: topUsers.map((user) => user.totalSpent),
          type: 'column',
          colorByPoint: true,
        },
      ],
      credits: { enabled: false },
    };
  }

  private initializeUsersCharts(): void {
    // Top spenders podium chart
    const topUsers = this.usersDTO
      .filter((user) => user.totalSpent > 0) // Only include users with spending
      .sort((a, b) => b.totalSpent - a.totalSpent) // Sort by totalSpent descending
      .slice(0, 3); // Top 3 users
  
    this.topSpendersChartOptions = {
      chart: { type: 'column' },
      title: { text: 'Top 3 Spenders' },
      xAxis: {
        categories: topUsers.map((user) => user.name),
        title: { text: 'Users' },
      },
      yAxis: {
        title: { text: 'Total Spent ($)' },
      },
      series: [
        {
          name: 'Total Spent',
          data: topUsers.map((user) => user.totalSpent),
          type: 'column',
          colorByPoint: true,
        },
      ],
      credits: { enabled: false },
    };
  }
  
}
