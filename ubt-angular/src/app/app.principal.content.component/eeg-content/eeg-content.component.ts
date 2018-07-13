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
  handle_data: any;

  constructor(private d3service: D3Service) {}

  ngAfterContentInit() {
    const channel1 = d3.select('#channel1');
    const channel2 = d3.select('#channel2');
    const channel3 = d3.select('#channel3');
    const channel4 = d3.select('#channel4');
    const channel5 = d3.select('#channel5');
    const channel6 = d3.select('#channel6');
    this.handle_data = this.d3service.getPatientData('id_patient', 0).subscribe(
        (response: Response) => {
          const data = response.json();
          const duration = data.patientInfo.duration;
          const array_channel_0 = data.channels[0];
          const array_channel_1 = data.channels[1];
          const array_channel_2 = data.channels[2];
          const array_channel_3 = data.channels[3];
          const array_channel_4 = data.channels[4];
          const array_channel_5 = data.channels[5];
          const array_channel_6 = data.channels[6];
          this.DrawChannel(channel1, 'line_eeg_1', array_channel_0, 0, duration);
          this.DrawChannel(channel2, 'line_eeg_2', array_channel_1, 0, duration);
          this.DrawChannel(channel3, 'line_eeg_3', array_channel_2, 0, duration);
          this.DrawChannel(channel4, 'line_eeg_4', array_channel_3, 0, duration);
          this.DrawChannel(channel5, 'line_eeg_5', array_channel_4, 0, duration);
          this.DrawChannel(channel6, 'line_eeg_6', array_channel_5, 0, duration);

        },
        (err) => {
          console.log(err);
        }
        );
  }

  DrawChannel (channel: any, class_eeg: String, data_eeg = [], start_time: number = 0, duration: string = '0') {
    if (data_eeg.length === 0) {
    } else {
        const channel_data = data_eeg.data;
        let i = 0;
        const time_parse      =   d3.timeParse( '%S' );
        const time_format     =   d3.timeFormat( '%S' );
//        const chart_width     =   +channel.attr('width');
//        const chart_height    =   +channel.attr('height');
        console.log(+channel.attr('width'));
        const chart_width     =   +channel.attr('width');
        const chart_height    =   150;
        const padding         =   50;
        for (const sample of channel_data) {
            const sample_time: number = Math.round(1000 * i * (1 / data_eeg.samplefrequency))  / 1000;
            sample.time = sample_time;
            i++;
        }
        const x_scale = d3.scaleLinear()
        .domain([
            0,
            d3.max(channel_data, function(d) {
                return d.time;
            })
        ])
        .range([padding, chart_width - padding]);

        const y_scale = d3.scaleLinear()
        .domain(
            [ 
                d3.min(channel_data, function(d) { 
                    return d.value 
                }), 
                d3.max(channel_data, function(d) { 
                    return d.value 
                })
            ])
        .range([chart_height - padding, padding]);

    const line = d3.line()
    .x(function(d){
        return x_scale(d.time);
    })
    .y(function(d){
        return y_scale(d.value);
    });

    channel
    .attr('width', chart_width)
    .attr('height', chart_height);

    // Create Axes
    const x_axis = d3.axisBottom(x_scale)
    .ticks(10);
    const y_axis = d3.axisLeft(y_scale)
    .ticks(12);
    channel.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + (chart_height - padding) + ')')
    .call(x_axis);
    channel.append('g')
    .attr('class', 'axis axis--y')
    .attr('transform', 'translate(' + padding + ',0)')
    .call(y_axis);
    channel.append('path')
    .datum(channel_data)
    .attr('fill', 'none')
    .attr('class', class_eeg)
    .attr('d', line);
    }
    }
}
