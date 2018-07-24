import { Component, Input, AfterContentInit, OnChanges } from '@angular/core';
import { D3Service } from '../../app.services/d3/d3.service';
import { Response } from '@angular/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-eeg-content',
  templateUrl: './eeg-content.component.html',
  styleUrls: ['./eeg-content.component.css']
})

export class EegContentComponent implements AfterContentInit, OnChanges {
    @Input() EEG_Status_eeg: boolean;
    @Input() Command_eeg: Array<number>;
    handle_data: any;
    channel_num: Array<number> = [2, 3, 4];
    scale_multiplier = [20, 50, 200];
    multiplier_pos = 0;
    color_scale: Array<string> = [
        '#be01ae',
        '#046102',
        '#036105',
        '#0604ae',
        '#be6105',
        '#066107',
        '#be07ae',
        '#086108',
        '#0961ae',
        '#be10ae',
        '#be6111',
        '#1261ae',
        '#be13ae',
        '#be6114',
        '#1561ae',
        '#be16ae',
        '#be6117',
        '#1861ae',
        '#be19ae',
        '#be6120'
    ];
    constructor(private d3service: D3Service) {
    }
    ngAfterContentInit() {
        /*
        this.handle_data = this.d3service.getPatientData('id_patient', 0)
        .subscribe(
            (response: Response) => {
                console.log('getpatient');
                console.log(response.json());
            });
        */
    }

    ngOnChanges() {
        this.delete_channel();
        this.paint_eeg('sujeto_base');
    }
    click_multiplier(event, direction: boolean) {
        if (direction) {
            if (this.multiplier_pos === 2) {
                this.multiplier_pos = 2;
            } else {
                this.multiplier_pos++;
            }
        }
        if (!direction) {
            if (this.multiplier_pos === 0) {
                this.multiplier_pos = 0;
            } else {
                this.multiplier_pos--;
            }
        }
        this.paint_eeg('sujeto_base');
    }
    delete_channel() {
        if (this.Command_eeg == null) {} else {
        console.log(this.Command_eeg[0] , this.Command_eeg[1]);
        if (this.Command_eeg[0] === 1 ) {
            for (let n = 1 ; n < 2; n++) {
                d3.select('#channel' + n).selectAll('path').remove();
                d3.select('#channel' + n).selectAll('g').remove();
            }
        }
        }
    }
    paint_eeg(filename: string) {
        const channel_array: Array<any> = [];
        for (let n = 1 ; n < 2; n++) {
            d3.select('#channel' + n).selectAll('path').remove();
            d3.select('#channel' + n).selectAll('g').remove();
            channel_array.push(d3.select('#channel' + n));
        }
        this.handle_data = this.d3service.getPatientInfo(filename).subscribe(
                (response: Response) => {
                  console.log(response);
                  const data = response;
                  const duration = data['patientInfo']['duration'];
                  let x_axis  = false;
                  let y_axis  = false;
                  for (const sample of channel_array) {
                    for (let j = 0 ; j < data['channels'].length; j++) {
                        if (j === 0) {x_axis = true; y_axis = true; } else { x_axis = false; y_axis = false; }
                       this.DrawChannel(sample, 'line_eeg_1', data['channels'][j], 0, duration, x_axis, y_axis, j);
                    }
                  }
                  this.handle_data.unsubscribe();
                },
                (err) => {
                    console.log(err);
                }
            );
    }
    DrawChannel (
        channel,
        class_eeg,
        data_eeg,
        start_time: number = 0,
        duration: string = '0',
        x_axis_status: boolean = false,
        y_axis_status: boolean = true,
        multiplier: number = 1,
        scale_multiplier = this.scale_multiplier[this.multiplier_pos],
        color_scale = this.color_scale,
        width = 1100,
        height = 600) {
            if (data_eeg.length !== 0) {
                const channel_data: Array<JSON> = data_eeg.data;
                let i = 0;
                const time_parse      =   d3.timeParse( '%S' );
                const time_format     =   d3.timeFormat( '%S' );
                let color_pos = 0;
                if (color_scale.length <= multiplier) {color_pos = color_scale.length; } else {color_pos = multiplier; }
                //        const chart_width     =   +channel.attr('width');
                //        const chart_height    =   +channel.attr('height');
                const chart_width     =   width;
                const chart_height    =   height;
                const padding         =   20;
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
                            return d['value'] * 2;
                        }),
                        d3.max(channel_data, function(d) {
                            return d['value'] * scale_multiplier * 0.8;
                        })
                    ])
                .range([chart_height - padding, padding]);
                for (const sample of channel_data) {
                    sample['value'] = sample['value'] + multiplier * scale_multiplier;
                }
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
                .attr('class', 'line_eeg_1')
                .attr('stroke', color_scale[color_pos - 1])
                .attr('d', line);
            }
        }
}
