import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { UserSettingsService } from '../user-settings.service';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { WatchDTO } from '../DTOs/watchDTO';
import { watchService } from '../watch.service';

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
  watchesDTO: WatchDTO[] = [];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options | undefined; // Initialized later

  constructor() {}

  ngOnInit(): void {
    this.userSettingsService.isSessionActive();
    this.watchservice.getWatchesDTO().subscribe({
      next: data => {
        console.log('Finished loading watches, saving to component field');
        this.watchesDTO = data;
        console.log(this.watchesDTO);
        this.initializeChart(); // Initialize chart after data is loaded
      },
      error: err => {
        console.log('Failed to load watches from Http server', err);
      }
    });
  }

  private initializeChart(): void {
    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Distribution of Watches by Price Range'
      },
      xAxis: {
        categories: ['10 to 50', '51 to 250', '251 to 500', '501 to 2000', '2001 to 10000', '10001 and more'],
        title: {
          text: 'Price Ranges (€)'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Watches'
        }
      },
      series: [{
        name: 'Watches',
        data: this.getWatchesData(),
        type: 'column',
        colorByPoint: true
      }],
      credits: {
        enabled: false
      }
    };
  }

  private getWatchesData(): number[] {
    const priceRanges = [0, 0, 0, 0, 0, 0];
    this.watchesDTO.forEach(watch => {
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
    return priceRanges;
  }
}
