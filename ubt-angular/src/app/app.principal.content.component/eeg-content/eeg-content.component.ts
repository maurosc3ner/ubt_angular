import { Component, Input, AfterContentInit } from '@angular/core';
import { D3Service } from '../../app.services/d3/d3.service';
import { Response } from '@angular/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-eeg-content',
  templateUrl: './eeg-content.component.html',
  styleUrls: ['./eeg-content.component.css']
})

export class EegContentComponent implements AfterContentInit {
  @Input() EEG_Status_eeg: Boolean;
  channel_1: any;

  constructor(private d3service: D3Service) {}

  ngAfterContentInit() {
    const channel1 = d3.select('#channel1');
    const channel2 = d3.select('#channel2');
    const channel3 = d3.select('#channel3');
    const channel4 = d3.select('#channel4');
    const channel5 = d3.select('#channel5');
    const channel6 = d3.select('#channel6');
    this.channel_1 = this.d3service.getPatientData('id_patient', 0).subscribe(
        (response: Response) => {
          const data = response.json();
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
        );
    this.DrawChannel(channel1, 'line_eeg_1');
    this.DrawChannel(channel2, 'line_eeg_2');
    this.DrawChannel(channel3, 'line_eeg_3');
    this.DrawChannel(channel4, 'line_eeg_4');
    this.DrawChannel(channel5, 'line_eeg_5');
    this.DrawChannel(channel6, 'line_eeg_6');
  }

  DrawChannel (channel: any, class_eeg: String) {
    const n = 11;
    const random = d3.randomNormal(0, .2);
    const data = d3.range(n).map(random);
    const margin = {top: 10, right: 50, bottom: 10, left: 30};
    const width = +channel.attr('width') - margin.left - margin.right;
    const height = +channel.attr('height') - margin.top - margin.bottom;
    const g = channel.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const x = d3.scaleLinear().domain([0, n - 1]).range([0, width]);
    const y = d3.scaleLinear().domain([-1, 1]).range([height, 0]);

    const line = d3.line()
    .x(function(d, i) { return x( i ); })
    .y(function(d, i) { return y( d ); });
    g.append('defs').append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', width)
        .attr('height', height);
    g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + y(0) + ')')
        .call(d3.axisBottom(x));
    g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y));
    g.append('g')
        .attr('clip-path', 'url(#clip)')
        .append('path')
        .datum(data)
        .attr('class', class_eeg)
        .attr('d', line);
    }
}
