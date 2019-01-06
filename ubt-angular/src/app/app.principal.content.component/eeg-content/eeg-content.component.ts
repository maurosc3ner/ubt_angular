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
                this.delete_channel();
             } else {
                this.current_scale = this.computeTimeScale(this.current_data);
                this.channel_num = this.init_channels();
                this.update_channel();
                this.create_channels(this.CheckStatus()[0], this.CheckStatus()[1], this.channel_num, false);
                this.cubismDraw(this.current_data);
            }
        }
    }

    click_multiplier(event, direction: boolean) {
        if (this.current_data == null) {
            // console.log('please load patient first');
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
    delete_channel() {
        const array_channels = this.eegmain.nativeElement.querySelectorAll('.row-eeg');
        array_channels.forEach(
            (node) => {
                node.parentNode.removeChild( node );
            }
        );
    }
    update_channel() {
        const div_number = this.current_data['channels'].length + 1;
        for (let n = 1 ; n < div_number + 1; n++) {
            d3.select('#channel' + n).selectAll('path').remove();
            d3.select('#channel' + n).selectAll('rect').remove();
            d3.select('#channel' + n).selectAll('g').remove();
            d3.select('#channel' + n).selectAll('text').remove();
            d3.select('#channel' + n).selectAll('line').remove();

        }
    }
    init_channels() {
        // console.log('init_channel');
        const channel_array: Array<any> = [];
        const div_number = this.current_data['channels'].length + 1;
        for (let n = div_number; n > -1; n--) {
        const divrow = document.createElement('div');
        this.renderer.addClass(divrow, 'row');
        this.renderer.addClass(divrow, 'mt-0');
        this.renderer.addClass(divrow, 'mb-0');
        this.renderer.addClass(divrow, 'row-eeg');
        const divcol = document.createElement('div');
        this.renderer.addClass(divcol, 'col-md-12');
        this.renderer.addClass(divcol, 'no-padding');
        this.renderer.appendChild(divrow, divcol);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.renderer.setAttribute(svg, 'id', 'channel' + n.toString());
        this.renderer.addClass(svg, 'fit-padding');
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
    const annotation = data['annotations'];
    const duration = data['patientInfo']['duration'];
    let x_axis  = true;
    let y_axis  = true;
    let j = 0;
    d3.selectAll('#y-axis').remove();
    for (const sample of channel_array) {
        if (j === 0 || j === channel_array.length - 1) {
            x_axis = true;
            y_axis = false;
            this.DrawChannel(   sample, 'line_eeg_1', data['channels'][0], 0,
            duration, x_axis, y_axis, 1, this.scale_multiplier[this.multiplier_pos],
            '#000000', width, height, updating, this.cursordata, 0, annotation);
        } else {
            x_axis = false;
            y_axis = true;
            // console.log('AMH_j', annotation);
            this.DrawChannel( sample, 'line_eeg_1', data['channels'][j - 1], 0,
            duration, x_axis, y_axis, 1, this.scale_multiplier[this.multiplier_pos],
            '#ffffff', width, height, updating, this.cursordata, 1, annotation);
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
        cursordata,
        channel_number_flag,
        annotation
    ) {
        if (data_eeg.length !== 0) {
            const channel_data: Array<JSON> = JSON.parse(JSON.stringify(data_eeg.data));
            let i = 0;
            const time_parse      =   d3.timeParse( '%Y-%m-%d-%H:%M:%S:%L' );
            const time_format     =   d3.timeFormat( '%H:%M:%S' );
            const chart_width     =   width;
            const chart_height    =   height;
            const padding         =   40;
            const scale_values = [];
            const date_formated = [];
            let date_array = [];
            this.current_scale.forEach(
            function(date) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            const milisecond = date.getMilliseconds();
            date_array = [year, month, day, hour, minute, second, milisecond];
            date_formated.push(date_array);
            scale_values.push(time_parse(
                <string>year + '-' + <string>month + '-' + <string>day + '-' +
                <string>hour + ':' + <string>minute + ':' + <string>second + ':' +
            <string>milisecond));
            });
            // console.log(date_array);
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
            if (channel_number_flag === 1 ) {
                current_channel.append('text')
                .text(data_eeg.label)
                .attr('x' , 0)
                .attr('y', 35)
                .attr('transform', 'translate(-25,50) rotate(-90)')
                .attr('class', 'text_channel')
                ;
            }
            const start_current_time = channel_data[0]['time'].getTime();
            const end_current_time = channel_data[channel_data.length - 1]['time'].getTime();
//            console.log('AMH-sample-start', channel_data[0]['time'].getTime());
//            console.log('AMH-sample-end', channel_data[channel_data.length - 1]['time'].getTime());
            const startDateGlobal = this.current_data['patientInfo']['startDate'].split('-');
            const startTimeGlobal = this.current_data['patientInfo']['startTime'].split(':');
            const date_array_start = new Date(startDateGlobal[2] - 0, startDateGlobal[1] - 1, startDateGlobal[0] - 0,
            startTimeGlobal[0] - 0, startTimeGlobal[1] - 0, startTimeGlobal[2] - 0);
//            console.log('AMH-sample-start-global', date_array_start.getTime());
            const start_time_global = date_array_start.getTime();
            const anno_times = [];
            for (const anno of annotation['items']) {
                const anno_date = start_time_global + anno['onset'] * 1000;
                if (anno_date >= start_current_time && anno_date <= end_current_time ) {
                    anno_times.push(anno_date);
                } else {
//                    console.log('AMH-Anno-times', anno_date, start_current_time, end_current_time);
//                    console.log('AMH-Anno-dates', new Date(anno_date), new Date(start_current_time), new Date(end_current_time));
                }
            }
            const date_values_anno = anno_times.map(
                d => {
                    const date = new Date( d );
                    return date;
                }
            );
            // console.log('AMH-sample-anno-times', anno_times);
            // console.log('AMH-sample-anno-dates', date_values_anno);

            anno_times.forEach((annotation_in_range) => {
                let i_anno = 0;
                for (const sample of this.channel_num) {
                    if (i_anno >= 1 && i_anno < this.channel_num.length - 1) {
                    const cursor_line = sample.append('line')
                    .attr('id', 'anno_line' + i_anno)
                    .attr('x1', x_scale(annotation_in_range))     // x position of the first end of the line
                    .attr('y1', 0)      // y position of the first end of the line
                    .attr('x2', x_scale(annotation_in_range))
                    .attr('y2', chart_height)
                    .attr('class', 'anno-line')
                    ;
                    }
                    i_anno++;
                }
            });

            current_channel.on('click', (d, d3index, nodes) =>  {
                const cursor_width = (data_eeg.samplefrequency * 10);
                // console.log('cursor_width ' + cursor_width);
                const cursor_scale = d3.scaleLinear()
                .domain([
                    padding,
                    chart_width - padding
                ])
                .range([
                    0,
                    cursor_width
                ]);
                const cursor_scale_inverse = d3.scaleLinear()
                .domain([
                    0,
                    cursor_width
                ])
                .range([
                    padding,
                    chart_width - padding
                ]);
                const current_mouse = d3.mouse(nodes[d3index])[0];
                // console.log(current_mouse, chart_width);
                if (current_mouse < padding) {
                    this.current_cursor = padding;
                } else if (current_mouse > chart_width - cursor_scale_inverse(data_eeg.samplefrequency)) {
                    this.current_cursor = chart_width - cursor_scale_inverse(data_eeg.samplefrequency);
                } else {
                    this.current_cursor = current_mouse;
                }
                const start_time_index = channel_data[0]['time'].getTime();
                const current_cursor_index = start_time_index
                + (cursor_scale(this.current_cursor) * (1 / data_eeg.samplefrequency)) * 1000;
                // console.log(this.current_cursor);
                const abs_current_cursor_time = new Date(current_cursor_index);
                const current_cursor_index_end = start_time_index
                // tslint:disable-next-line:max-line-length
                + (Math.round(cursor_scale(this.current_cursor + cursor_scale_inverse(data_eeg.samplefrequency) - padding)) * (1 / data_eeg.samplefrequency)) * 1000;
                const abs_current_cursor_end_time = new Date(current_cursor_index_end);
                cursordata.emit((Math.round(cursor_scale(this.current_cursor))));
                let cursor_box, cursor_line, cursor_line_end, cursor_label, cursor_label_end;
                if (channel_number_flag === 1) {
                    let channel_count = 0;
                    for (const sample of this.channel_num) {
                        if (channel_count === 0 || channel_count === this.channel_num.length - 1) {
                            if (sample.select('#cursor_label' + channel_count).empty()) {
                                cursor_label = sample.append('text');
                            } else {
                                cursor_label = sample.select('#cursor_label' + channel_count);
                            }
                            const label_value = abs_current_cursor_time;
                            let date = new Date(label_value);
                            let year = date.getFullYear();
                            let month = date.getMonth();
                            let day = date.getDay();
                            let hour = date.getHours();
                            let minute = date.getMinutes();
                            let second = date.getSeconds();
                            let milisecond = date.getMilliseconds();
                            let milisecond_2;
                            if (milisecond < 100) {
                                milisecond_2 = '0' + milisecond;
                            } else if (milisecond < 10) {
                                milisecond_2 = '0' + '0' + milisecond;
                            } else {
                                milisecond_2 = milisecond;
                            }
                            let cursor_date_text = '';
                            if ( chart_width > 550) {
                                cursor_date_text = hour + ':' + minute + ':' + second + ':' + milisecond_2;
                            } else {
                                cursor_date_text = hour + ':' + minute + ':' + second;
                            }
                            cursor_label
                            .transition()
                            .duration(1000)
                            .attr('id', 'cursor_label' + channel_count)
                            .text(cursor_date_text)
                            .attr('class', 'text_channel')
                            .attr('x' , this.current_cursor);
                            if (channel_count === 0) {
                                cursor_label.attr('y' , 12);
                            }
                            if (channel_count !== 0) {
                                cursor_label.attr('y' , 65);
                            }
                            if (sample.select('#cursor_label' + channel_count).empty()) {
                                cursor_label_end = sample.append('text');
                            } else {
                                cursor_label_end = sample.select('#cursor_label_end' + channel_count);
                            }
                            const label_value_end = abs_current_cursor_end_time;
                            date = new Date(label_value_end);
                            year = date.getFullYear();
                            month = date.getMonth();
                            day = date.getDay();
                            hour = date.getHours();
                            minute = date.getMinutes();
                            second = date.getSeconds();
                            milisecond = date.getMilliseconds();
                            if (milisecond < 100) {
                                milisecond_2 = '0' + milisecond;
                            } else if (milisecond < 10) {
                                milisecond_2 = '0' + '0' + milisecond;
                            } else {
                                milisecond_2 = milisecond;
                            }
                            let cursor_date_text_end = '';
                            if ( chart_width > 550) {
                                cursor_date_text_end = hour + ':' + minute + ':' + second + ':' + milisecond_2;
                            } else {
                                cursor_date_text_end = hour + ':' + minute + ':' + second;
                            }
                            cursor_label_end
                            .transition()
                            .duration(1000)
                            .attr('id', 'cursor_label_end' + channel_count)
                            .text(cursor_date_text_end)
                            .attr('class', 'text_channel')
                            .attr('x' , this.current_cursor + cursor_scale_inverse(data_eeg.samplefrequency) - padding);
                            if (channel_count === 0) {
                                cursor_label_end.attr('y' , 12);
                            }
                            if (channel_count !== 0) {
                                cursor_label_end.attr('y' , 65);
                            }
                            channel_count ++;
                            continue;
                        } else {
                            if (sample.select('#cursor_box' + channel_count).empty()) {
                                cursor_box = sample.append('rect');
                            } else {
                                cursor_box = sample.select('#cursor_box' + channel_count);
                            }
                            cursor_box
                            .transition()
                            .duration(1000)
                            .attr('id', 'cursor_box' + channel_count)
                            .attr('x' , this.current_cursor)
                            .attr('y' , 0)
                            .attr('width', cursor_scale_inverse(data_eeg.samplefrequency) - padding)
                            .attr('height', chart_height )
                            .attr('fill', 'green')
                            .attr('stroke-width', 0)
                            .attr('opacity', 0.15);
                            if (sample.select('#cursor_line' + channel_count).empty()) {
                                cursor_line = sample.append('line');
                            } else {
                                cursor_line = sample.select('#cursor_line' + channel_count);
                            }
                            cursor_line
                            .transition()
                            .duration(1000)
                            .attr('id', 'cursor_line' + channel_count)
                            .attr('x1', this.current_cursor)     // x position of the first end of the line
                            .attr('y1', 0)      // y position of the first end of the line
                            .attr('x2', this.current_cursor)
                            .attr('y2', chart_height)
                            .attr('class', 'cursor-line')
                            ;

                            if (sample.select('#cursor_line_end' + channel_count).empty()) {
                                cursor_line_end = sample.append('line');
                            } else {
                                cursor_line_end = sample.select('#cursor_line_end' + channel_count);
                            }
                            cursor_line_end
                            .transition()
                            .duration(1000)
                            .attr('id', 'cursor_line_end' + channel_count)
                            // tslint:disable-next-line:max-line-length
                            .attr('x1', this.current_cursor + cursor_scale_inverse(data_eeg.samplefrequency) - padding)     // x position of the first end of the line
                            .attr('y1', 0)      // y position of the first end of the line
                            .attr('x2', this.current_cursor + cursor_scale_inverse(data_eeg.samplefrequency) - padding)
                            .attr('y2', chart_height)
                            .attr('class', 'cursor-line')
                            ;

                            channel_count ++;
                        }
                    }
                }
            });
        }
    }

    CheckStatus() {
        // console.log('eegStatusVis:', this.EEG_Status_eeg);
        const height = 70;
        // tslint:disable-next-line:no-unused-expression
        const width_component = this.eegmain.nativeElement.offsetWidth;
        if (this.EEG_Status_eeg === 0) { return [width_component, height]; }
        if (this.EEG_Status_eeg === 1) { return [width_component, height]; }
        if (this.EEG_Status_eeg === 2) { return [width_component, height]; }
        if (this.EEG_Status_eeg === 3) { return [width_component, height]; }
        if (this.EEG_Status_eeg === 4) { return [width_component, height]; }
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
        const startCurrentTime = (startTime['startTime'] + startTime['index'] * time_sample); // Error mixing time with samples
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
        // console.log('AMH_times', date_values);
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
