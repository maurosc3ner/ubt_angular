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
    @Input() EEG_Status_eeg: number;
    @Input() Command_eeg: Array<number>;
    @Input() current_data: any = null;
    handle_data: any;
    channel_num: Array<any>;
    scale_multiplier = [20, 50, 200];
    multiplier_pos = 0;
    current_cursor = 0;
    color_scale: Array<string> = [
        '#e6194b',
        '#3cb44b',
        '#ffe119',
        '#0082c8',
        '#f58231',
        '#911eb4',
        '#46f0f0',
        '#f032e6',
        '#d2f53c',
        '#FFFFFF',
        '#e6194b',
        '#3cb44b',
        '#ffe119',
        '#0082c8',
        '#f58231',
        '#911eb4',
        '#46f0f0',
        '#f032e6',
        '#d2f53c',
        '#FFFFFF'
    ];
    constructor(private d3service: D3Service) {
    }
    ngAfterContentInit() {

    }
    ngOnChanges() {
        if (this.Command_eeg == null) {
            if (this.current_data == null) {
                this.delete_channel(true);
             } else {
                this.delete_channel(true);
                this.channel_num = this.init_channels();
                this.create_channels(this.CheckStatus()[0], this.CheckStatus()[1], this.channel_num, false);
            }
        } else {
            if (this.Command_eeg[0] === 1 ) {
                this.delete_channel(true);
            }
            this.Command_eeg = null;
        }
    }

    click_multiplier(event, direction: boolean) {
        if (this.current_data == null) {
            console.log('please load patient first');
            return 0;
        }
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
        this.create_channels( this.CheckStatus()[0], this.CheckStatus()[1], this.channel_num, true);
    }
    delete_channel(command = false) {
            for (let n = 1 ; n < 2; n++) {
                if (command ) { d3.select('#channel' + n).selectAll('path').remove(); }
                d3.select('#channel' + n).selectAll('g').remove();
        }
    }
    init_channels() {
        const channel_array: Array<any> = [];
        for (let n = 1 ; n < 2; n++) {
            const current_channel = d3.select('#channel' + n);
            channel_array.push(current_channel);
            return channel_array;
        }
    }
    create_channels(
        width = 1100,
        height = 600,
        channel_array,
        updating = false
    ) {
        const data = this.current_data;
        const duration = data['patientInfo']['duration'];
        let x_axis  = false;
        let y_axis  = false;
        for (const sample of channel_array) {
            for (let j = 0 ; j < data['channels'].length; j++) {
                if (j === 0) {x_axis = true; y_axis = true; } else { x_axis = false; y_axis = false; }
                this.DrawChannel(
                    sample,
                    'line_eeg_1',
                    data['channels'][j],
                    0,
                    duration,
                    x_axis,
                    y_axis,
                    j,
                    this.scale_multiplier[this.multiplier_pos],
                    this.color_scale,
                    width,
                    height,
                    updating
                );
            }
        }
    }
    DrawChannel (
        current_channel,
        class_eeg,
        data_eeg,
        start_time: number = 0,
        duration: string = '0',
        x_axis_status: boolean = false,
        y_axis_status: boolean = true,
        multiplier: any = 1,
        scale_multiplier,
        color_scale,
        width,
        height,
        updating = false
    ) {
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
                current_channel
                .attr('width', chart_width)
                .attr('height', chart_height);
                // Create Axes
                const x_axis = d3.axisBottom(x_scale)
                .ticks(10);
                const y_axis = d3.axisLeft(y_scale)
                .ticks(12);
                if (x_axis_status) {
                    current_channel.append('g')
                    .attr('class', 'axis axis--x')
                    .attr('transform', 'translate(0,' + (chart_height - padding) + ')')
                    .call(x_axis);
                }
                if (y_axis_status) {
                    current_channel.append('g')
                    .attr('class', 'axis axis--y')
                    .attr('transform', 'translate(' + padding + ',0)')
                    .call(y_axis);
                }
                if ( updating ) {
                current_channel
                .select( '#id_' + <string>multiplier )
                .datum(channel_data)
                .transition()
                .duration(1000)
                .attr('d', line)
                .attr('transform', null)
                .attr('fill', 'none')
                .attr('class', 'line_eeg_1')
                .attr('stroke', color_scale[color_pos - 1]);
                } else {
                current_channel.append('path')
                .datum(channel_data)
                .attr('d', line)
                .attr('id', 'id_' + <string>multiplier )
                .attr('transform', null)
                .attr('fill', 'none')
                .attr('class', 'line_eeg_1')
                .attr('stroke', color_scale[color_pos - 1]);
                }
                current_channel.on('click', function(d) {
                    this.current_cursor = d3.mouse(this)[0];
                    let cursor;
                    if (current_channel.select('#cursor').empty()) {
                        cursor = current_channel.append('line');
                    } else {
                        cursor = current_channel.select('#cursor');
                    }
                    cursor.transition()
                    .duration(1000)
                    .attr('id', 'cursor')
                    .attr('r', 5)
                    .attr('x1' , d3.mouse(this)[0])
                    .attr('x2' , d3.mouse(this)[0])
                    .attr('y1' , 0)
                    .attr('y2' , chart_height)
                    .attr('stroke' , '#FF0000')
                    .attr('stroke-width' , 2);
                });
            }
    }
    CheckStatus() {
        if (this.EEG_Status_eeg === 0) {
            return [1100, 530];
        }
        if (this.EEG_Status_eeg === 1) {
            return [430, 480];
        }
        if (this.EEG_Status_eeg === 2) {
            return [1100, 530];
        }
        if (this.EEG_Status_eeg === 3) {
            return [1100, 530];
        }
    }
}
