import {
    Component,
    Input,
    AfterContentInit,
    OnChanges,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    Renderer2
} from '@angular/core';
import { D3Service } from '../../app.services/d3/d3.service';

import * as d3 from 'd3';
declare let cubism: any;

@Component({
  selector: 'app-eeg-content',
  templateUrl: './eeg-content.component.html',
  styleUrls: ['./eeg-content.component.css']
})
export class EegContentComponent implements AfterContentInit, OnChanges {
    @Input() EEG_Status_eeg: number;
    @Input() Command_eeg: Array<number>;
    @Input() current_data: any = null;
    @Output() cursordata = new EventEmitter();
    @ViewChild('eegmain') eegmain: ElementRef;
    visualization_type: String = 'Lines';
    control_vis: Boolean = false;
    handle_data: any;
    channel_num: Array<any>;
    scale_multiplier = [20, 50, 200];
    multiplier_pos = 0;
    current_cursor = 0;
    current_cursor_position = 0;
    current_scale: Array<any>;
    color_scale: Array<string> = [
         '#ffffff',
    ];
    constructor(private d3service: D3Service, private renderer: Renderer2) {
    }
    ngAfterContentInit() {
    }
    ngOnChanges() {
        // console.log('AMHOnchangeseegcomponent', this.current_data, this.Command_eeg);
        if (this.Command_eeg == null) {
            if (this.current_data === undefined || JSON.stringify(this.current_data) === '{}') {
                // console.log('AMHOnundefined', this.current_data, this.Command_eeg);
                this.delete_channel(2);
             } else {
                // console.log('AMHStartTime', this.current_data['debug']['time']);
                this.current_scale = this.computeTimeScale(this.current_data);
                this.channel_num = this.init_channels();
                this.delete_channel(this.channel_num.length);
                this.create_channels(this.CheckStatus()[0], this.CheckStatus()[1], this.channel_num, false);
                this.cubismDraw(this.current_data);
            }
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
        this.create_channels(this.CheckStatus()[0], this.CheckStatus()[1], this.channel_num, true);
        this.cubismDraw(this.current_data);
    }

    delete_channel(n_channels) {
        for (let n = 1 ; n < n_channels + 1; n++) {
            d3.select('#channel' + n).selectAll('path').remove();
            d3.select('#channel' + n).selectAll('rect').remove();
            d3.select('#channel' + n).selectAll('g').remove();
        }
//        d3.select('#graph').selectAll('div').remove();
    }

    init_channels() {
        const channel_array: Array<any> = [];
        const div_number = this.current_data['channels'].length + 1;
        for (let n = div_number; n > -1; n--) {
        const divrow = document.createElement('div');
        this.renderer.addClass(divrow, 'row');
        const divcol = document.createElement('div');
        this.renderer.addClass(divcol, 'col');
        this.renderer.appendChild(divrow, divcol);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.renderer.setAttribute(svg, 'id', 'channel' + n.toString());
        this.renderer.appendChild(divcol, svg);
        this.renderer.appendChild(this.eegmain.nativeElement, divrow);
        }
        for (let n = 0 ; n < div_number + 1; n++) {
            const current_channel = d3.select('#channel' + n);
            channel_array.push(current_channel);
        }
        return channel_array;
    }

    create_channels( width = 980, height = 100, channel_array, updating = false ) {
    const data = this.current_data;
    const duration = data['patientInfo']['duration'];
    let x_axis  = true;
    let y_axis  = true;
    let j = 0;
    d3.selectAll('#y-axis').remove();
    for (const sample of channel_array) {
        console.log('AMH_j', j, channel_array.length);
        if (j === 0 || j === channel_array.length - 1) {
            x_axis = true;
            y_axis = false;
            this.DrawChannel(   sample, 'line_eeg_1', data['channels'][0], 0,
            duration, x_axis, y_axis, 1, this.scale_multiplier[this.multiplier_pos],
            '#000000', width, height, updating, this.cursordata );
        } else {
            x_axis = false;
            y_axis = true;
            // console.log('AMH_j', data['channels'][j - 1]);
            this.DrawChannel(   sample, 'line_eeg_1', data['channels'][j - 1], 0,
            duration, x_axis, y_axis, 1, this.scale_multiplier[this.multiplier_pos],
            '#ffffff', width, height, updating, this.cursordata );
        }
        j++;
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
        updating = false,
        cursordata
    ) {
        if (data_eeg.length !== 0) {
            const channel_data: Array<JSON> = JSON.parse(JSON.stringify(data_eeg.data));
            let i = 0;
            const time_parse      =   d3.timeParse( '%Y-%m-%d-%H:%M:%S:%L' );
            const time_format     =   d3.timeFormat( '%H:%M:%S' );
            const chart_width     =   width;
            const chart_height    =   height;
            const padding         =   30;
            const scale_values = [];
            this.current_scale.forEach(
            function(date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDay();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            const milisecond = date.getMilliseconds();
            const date_array = [year, month, day, hour, minute, second, milisecond];
            scale_values.push(time_parse(
                <string>year + '-' + <string>month + '-' + <string>day + '-' +
                <string>hour + ':' + <string>minute + ':' + <string>second + ':' +
            <string>milisecond));
            });
            for (const sample of channel_data) {
                sample['time'] = scale_values[i];
                i++;
            }

            const x_scale = d3.scaleTime()
            .domain([d3.min(channel_data, (d) => d['time']), d3.max(channel_data, (d) => d['time'])])
            .range([padding, chart_width - padding]);

            const y_scale = d3.scaleLinear()
//            .domain([d3.min(channel_data, (d) => d['value']), d3.max(channel_data, (d) => d['value'] * scale_multiplier * 0.005)])
            .domain([- 1.05 * scale_multiplier, 1.05 * scale_multiplier])
            .range([chart_height - 5, 5]);

            const line = d3.line()
                .x((d) => x_scale(d['time']))
                .y((d) => y_scale(d['value']));

            current_channel
            .attr('width', chart_width)
            .attr('height', chart_height);

            // Create X Axis
            const x_axis = d3.axisBottom(x_scale)
            .ticks(5)
            .tickFormat(time_format);

            // Create Y Axis
            const y_axis = d3.axisLeft(y_scale)
            .ticks(5);

            if (x_axis_status) {
                current_channel.selectAll('g').remove();
                current_channel.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', 'translate(0,' + (chart_height - padding) + ')')
                .call(x_axis);
            }
            if (y_axis_status) {
                current_channel.append('g')
                .attr('id', 'y-axis')
                .attr('class', 'axis axis--y')
                .attr('transform', 'translate(' + padding + ')')
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
                .attr('stroke', color_scale);
            } else {
                current_channel.append('path')
                .datum(channel_data)
                .attr('d', line)
                .attr('id', 'id_' + <string>multiplier )
                .attr('transform', null)
                .attr('fill', 'none')
                .attr('class', 'line_eeg_1')
                .attr('stroke', color_scale);
                if (x_axis_status) {
                    current_channel
                    .attr('class', 'channel-0');
                }
            }
            current_channel.on('click', (d, d3index, nodes) =>  {
                const cursor_scale = d3.scaleLinear()
                .domain([padding, chart_width + padding])
                .range([0, 2500]);
                const cursor_scale_inverse = d3.scaleLinear()
                .domain([0, 2500])
                .range([padding, chart_width + padding
                ]);
                const current_mouse = d3.mouse(nodes[d3index])[0];
                if (current_mouse < padding) {
                    this.current_cursor = padding;
                } else if (current_mouse + cursor_scale_inverse(data_eeg.samplefrequency) > chart_width) {
                    this.current_cursor = chart_width - cursor_scale_inverse(data_eeg.samplefrequency) + padding;
                } else {
                    this.current_cursor = current_mouse;
                }
                const start_time_index = channel_data[0]['time'].getTime();
                const current_cursor_index = start_time_index
                + (Math.round(cursor_scale(this.current_cursor)) * (1 / data_eeg.samplefrequency)) * 1000;
                const abs_current_cursor_time = new Date(current_cursor_index);
                cursordata.emit((Math.round(cursor_scale(this.current_cursor))));
                let cursor;
                //
                for (const sample of this.channel_num) {
                    if (sample.selectAll('#cursor').empty()) {
                        cursor = sample.append('rect');
                    } else {
                        cursor = sample.select('#cursor');
                    }
                    cursor
                    .transition()
                    .duration(1000)
                    .attr('id', 'cursor')
                    .attr('r', 5)
                    .attr('x' , this.current_cursor)
                    .attr('y' , 0)
                    .attr('width' , cursor_scale_inverse(data_eeg.samplefrequency))
                    .attr('height' , chart_height )
                    .attr('stroke' , '#FF0000')
                    .attr('stroke-width' , 2)
                    .attr('opacity', 0.5);
                }
            });
            }
    }

    CheckStatus() {
        // console.log('eegStatusVis:', this.EEG_Status_eeg);
        const height = 70;
        if (this.EEG_Status_eeg === 0) { return [1300, height]; }
        if (this.EEG_Status_eeg === 1) { return [480, height]; }
        if (this.EEG_Status_eeg === 2) { return [1300, height]; }
        if (this.EEG_Status_eeg === 3) { return [480, height]; }
        if (this.EEG_Status_eeg === 4) { return [480, height]; }
    }
    visualControl(event) {
        if (this.visualization_type === 'Lines') { this.control_vis = false;
        } else if (this.visualization_type === 'Horizon') { this.control_vis = true;
        } else { this.control_vis = false; }
    }

    computeTimeScale(data) {
        const startTime = data['debug']['time'];
        const frequency = Math.max.apply(null, data['channels'].map(function(d) { return String(d['samplefrequency']); }));
        const time_sample = 1 / frequency;
        const max_samples = Math.max.apply(null, data['channels'].map(
            d => d['data'].length
            )
        );

        const startCurrentTime =  (startTime['startTime'] + startTime['index'] * time_sample); // Error mixing time with samples

        const time_values = [];

        for (let i = 0; i < max_samples; i++) {
            time_values.push( startCurrentTime + i * time_sample);
        }
        const date_values = time_values.map(
            d => {
                const date = new Date( d * 1000 );
                return date;
            }
        );
        return date_values;
    }

    // For future use
    cubismDraw(data) {
        d3.select('#graph').selectAll('div').remove();
        const multip = this.scale_multiplier[this.multiplier_pos];
        const size_cubic = 2500;
        const step_cubic = size_cubic / 1100;
        const eeg_values = data['channels'].map(function(d) {
            return d['data'].map(
                function(f) {
                    return f['value'];
                });
            });

        const extent = [ -5 * multip,
            5 * multip ];

        const spectral = [
        '#66c2a5', '#abdda4', '#fee08b', '#f46d43', '#d53e4f',
        '#66c2a5', '#abdda4', '#fee08b', '#f46d43', '#d53e4f'];

        const context = cubism
        .context()
        .step(step_cubic)
        .size(1100)
        .stop();

        const horizon = context
        .horizon()
        .height([70])
        .mode(['mirror'])
        .extent(extent)
        .colors(spectral);

        const revalues = function temp(name) {
            return context.metric(
                function(start, stop, step, callback) {
                const min_eeg = Math.min.apply(null, eeg_values[name]);
                const values = eeg_values[name].map(
                    // d => d + Math.abs(min_eeg)
                    d => d
                );
                // console.log('AMH_data_eeg_min', name, min_eeg);
                callback(null, values);
                }, name);
        };

        const renames = data['channels'].map(function(d) { return String(d['id']); });
        horizon.metric(revalues);
        d3.select('#graph').selectAll('.horizon')
            .data(renames)
            .enter()
            .append('div')
            .attr('class', 'horizon')
            .call(horizon);
        d3.select('#graph')
        .selectAll('.axis')
        .data(['top'])
        .enter()
        .append('div')
        .attr('class', 'axis axis--x')
        .each(
        function(d) {
            d3.select(this)
            .call(
                context
                .axis()
                .ticks(10)
                .orient(d)
            );
        });
        // d3.select('#graph').append('div').attr('class', 'axis axis--x').append('g').call(axis);
    }
}
