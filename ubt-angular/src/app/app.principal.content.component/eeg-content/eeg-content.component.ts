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
  channel_num: Array<number> = [2, 3, 4];
  constructor(private d3service: D3Service) {
  }

  ngAfterContentInit() {
    const channel_array: Array<any> = [];
    for (let n = 1 ; n < 3; n++) {
        console.log(d3.select('#channel' + n));
        channel_array.push(d3.select('#channel' + n));
        }
        this.handle_data = this.d3service.getPatientData('id_patient', 0).subscribe(
            (response: Response) => {
              const data = response.json();
              const duration = data.patientInfo.duration;
              let j = 1;
              for (const sample of channel_array) {
                this.DrawChannel(sample, 'line_eeg_' + String(j), data.channels[j], 0, duration);
                j++;
              }
            },
            (err) => {
                console.log(err);
            }
        );
    }

  DrawChannel (channel, class_eeg, data_eeg, start_time: number = 0,
    duration: string = '0',
    x_axis_status: boolean = false,
    y_axis_status: boolean = true) {
    if (data_eeg.length !== 0) {
        const channel_data: Array<JSON> = data_eeg.data;
        let i = 0;
        const time_parse      =   d3.timeParse( '%S' );
        const time_format     =   d3.timeFormat( '%S' );
//        const chart_width     =   +channel.attr('width');
//        const chart_height    =   +channel.attr('height');

        const chart_width     =   200;
        const chart_height    =   50;
        const padding         =   10;

        for (const sample of channel_data) {
            const sample_time: number = Math.round(1000 * i * (1 / data_eeg.samplefrequency))  / 1000;
            sample['time'] = sample_time;
            i++;
        }
        const x_scale = d3.scaleLinear()
        .domain([
            0,
            d3.max(channel_data, function(d) {
            return d['time'];
            })
        ]).range([padding, chart_width - padding]);

        const y_scale = d3.scaleLinear()
        .domain(
            [
                d3.min(channel_data, function(d) {
                    return d['value'];
                }),
                d3.max(channel_data, function(d) {
                    return d['value'];
                })
            ])
        .range([chart_height - padding, padding]);

    const line = d3.line()
    .x(function(d) {
        return x_scale(d['time']);
    })
    .y(function(d) {
        return y_scale(d['value']);
    });

    channel
    .attr('width', chart_width)
    .attr('height', chart_height);

    // Create Axes
    const x_axis = d3.axisBottom(x_scale)
    .ticks(10);
    const y_axis = d3.axisLeft(y_scale)
    .ticks(12);
    if (x_axis_status) {
        channel.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + (chart_height - padding) + ')')
        .call(x_axis);
    }
    if (y_axis_status) {
        channel.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', 'translate(' + padding + ',0)')
        .call(y_axis);
    }
    channel.append('path')
    .datum(channel_data)
    .attr('fill', 'none')
    .attr('class', class_eeg)
    .attr('d', line);
    }
}
}
