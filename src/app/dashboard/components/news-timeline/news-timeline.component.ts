import { Component, ViewChild, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-news-timeline',
  templateUrl: './news-timeline.component.html',
  styleUrls: ['./news-timeline.component.scss']
})
export class NewsTimelineComponent implements OnChanges {

  @Input() data;

  @ViewChild('chart', {static: true}) canvas: ElementRef;

  chart: Chart;

  dataSet: any;

  constructor() { }

  ngOnChanges({ data }: SimpleChanges) {
    if (data.currentValue && data.currentValue.length > 0) {
      const chartData = data.currentValue.map(d => ({ objectID: d.objectID, points: d.points }));
      if (this.chart) {
        this.updateChart(chartData);
      } else {
        this.loadChart(chartData);
      }
    }
  }

  loadChart(chartData) {
    this.dataSet = {
      labels: chartData.map(d => d.objectID),
      datasets: [{
        data: chartData.map(d => d.points),
        borderColor: '#0000ff',
        backgroundColor: '#0000ff',
        fill: false,
        pointRadius: 5
      }]
    };

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: this.dataSet,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        layout: {
          padding: {
            top: 20,
            bottom: 10
          }
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              fontStyle: 'bold',
              fontSize: 18,
              labelString: 'ID'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              fontStyle: 'bold',
              fontSize: 18,
              labelString: 'Votes'
            }
          }]
        }
      }
    });
  }

  updateChart(res) {
    this.dataSet.labels = res.map(d => d.objectID);
    this.dataSet.datasets[0].data = res.map(d => d.points);
    this.chart.update();
    this.chart.resize();
  }
}
