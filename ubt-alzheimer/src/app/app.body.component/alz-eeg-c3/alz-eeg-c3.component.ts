import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation
} from '@angular/core';
import * as c3 from 'c3';
import {
  rgb
} from '../../../../node_modules/@types/d3';

@Component({
  selector: 'app-alz-eeg-c3',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './alz-eeg-c3.component.html',
  styleUrls: ['./alz-eeg-c3.component.css']


})
export class AlzEegC3Component implements OnInit {
  @Input() EEG_Status_eeg;
  @Input() current_data = null;
  chartPLETH;
  currentPLETH = 0;
  dataPLETH = [];
  fdPLETH: boolean;
  annotIdx=0;

  chartENT100;
  dataENT100 = [];
  fdENT100: boolean;

//   "CO2 ET", "CO2 FI",
  chartCO2ET;
  currentCO2ET = 0; 
  dataCO2ET = [];
  fdCO2ET: boolean;

  chartCO2FI;
  dataCO2FI = [];
  fdCO2FI: boolean;

  chartENTROPYRE;
  dataENTROPYRE = [];
  fdENTROPYRE: boolean;

  chartENTROPYSE;
  dataENTROPYSE = [];
  fdENTROPYSE: boolean;

  chartENTROPYBSR;
  dataENTROPYBSR = [];
  fdENTROPYBSR: boolean;

  chartECGHR;
  dataECGHR = [];
  fdECGHR: boolean;

  chartECGIMP;
  dataECGIMP = [];
  fdECGIMP: boolean;

  chartNIBPMEAN;
  dataNIBPMEAN = [];
  fdNIBPMEAN: boolean;

  chartNIBPDIA;
  dataNIBPDIA = [];
  fdNIBPDIA: boolean;

  chartNIBPSYS;
  dataNIBPSYS = [];
  fdNIBPSYS: boolean;

  //"TEMP (t1)"
  chartTEMPT1;
  dataTEMPT1 = [];
  fdTEMPT1: boolean;
  constructor() {}

  ngOnInit() {
      //PLETH
      this.fdPLETH = false;
      this.dataPLETH = ['PLETH', 0, 0, 0, 0, 0];
      this.currentPLETH=this.dataPLETH.length-1;
      this.chartPLETH = c3.generate({
        bindto: '#chartPLETH',
        size: {
            height: 200
        },

        data: {
            columns: [
                this.dataPLETH
            ],
            type: 'spline'
        },
        point: {
            show: false
        },
        legend: {
            show: false
        },
        tooltip: {
            show: true,

            format: {
                title: function(d) {
                    return 'Value ';
                },
                // value: function (value, ratio, id) {

                //     return format(value);
                // }
                //            value: d3.format(',') // apply this format to both y and y2
            }

        },
        color: {
            pattern: ['#00ff00']
        },
        axis: {
            y: {
                label: {
                    text: 'Voltage (mV)',
                    position: 'outer-middle'
                    // inner-top : default
                    // inner-middle
                    // inner-bottom
                    // outer-top
                    // outer-middle
                    // outer-bottom
                },
                max: 5,
                min: -5
            },
            x: {
                label: {
                    text: 'PLETH (5s)',
                    position: 'inner-top'
                }
            }
        },
        // onrendered: function () {
        //     var xg = d3.selectAll(".c3-xgrid-lines text");
        //     xg.each (function (d,i) {
        //             var title = d3.select(this).select("title");
        //         if (title.empty()) {
        //             title = xg.append("title");
        //         }
        //         title.text (function (d) {
        //             return "Gridline: "+d.value+", "+d.text;
        //         })
        //     })
        // },
      });
      //ENT_100
      this.fdENT100 = false;
      this.dataENT100 = ['ENT100', 0, 0, 0, 0, 0];
      this.chartENT100 = c3.generate({
          bindto: '#chartENT100',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataENT100
              ],
              type: 'spline'
          },
          point: {
              show: false
          },
          tooltip: {
              show: true,

              format: {
                  title: function(d) {
                      return 'Value ';
                  },
                  // value: function (value, ratio, id) {

                  //     return format(value);
                  // }
                  //            value: d3.format(',') // apply this format to both y and y2
              }

          },
          legend: {
              // position: 'right'
              show: false
          },
          color: {
              pattern: ['#1f77b4']
          },
          axis: {
              y: {
                  label: {
                      text: 'Voltage (uV)',
                      position: 'outer-middle'
                      // inner-top : default
                      // inner-middle
                      // inner-bottom
                      // outer-top
                      // outer-middle
                      // outer-bottom
                  },
                  max: 50,
                  min: -50
              },
              x: {
                  label: {
                      text: 'ENT_100 (5s)',
                      position: 'inner-top'
                  }
              }
          }
      });
      //CO2ET
      this.fdCO2ET = false;
      this.dataCO2ET = ['CO2ET', 0, 0, 0, 0, 0];
      this.chartCO2ET = c3.generate({
          bindto: '#chartCO2ET',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataCO2ET
              ],
              type: 'spline'
          },
          point: {
              show: false
          },
          tooltip: {
              show: true,
              format: {
                  title: function(d) {
                      return 'Value ';
                  },
              }
          },
          legend: {
              show: false
          },
          color: {
              pattern: ['#F8DE7E'] //mellow yellow
          },
          axis: {
              y: {
                  label: {
                      text: 'Voltage (uV)',
                      position: 'outer-middle'
                  },
                  max: 5,
                  min: -1
              },
              x: {
                  label: {
                      text: 'CO2_ET',
                      position: 'inner-top'
                  }
              }
          }
      }); // end fi CO2_ET
      //CO2FI
      this.fdCO2FI = false;
      this.dataCO2FI = ['CO2FI', 0, 0, 0, 0, 0];
      this.chartCO2FI = c3.generate({
          bindto: '#chartCO2FI',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataCO2FI
              ],
              type: 'spline'
          },
          point: {
              show: false
          },
          tooltip: {
              show: true,
              format: {
                  title: function(d) {
                      return 'Value ';
                  },
              }
          },
          legend: {
              show: false
          },
          color: {
              pattern: ['#FFD300'] //cyber yellow
          },
          axis: {
              y: {
                  label: {
                      text: 'Voltage (uV)',
                      position: 'outer-middle'
                  },
                  max: 5,
                  min: -1
              },
              x: {
                  label: {
                      text: 'CO2_FI',
                      position: 'inner-top'
                  }
              }
          }
      }); // end fi CO2_ET
      //ECGHR
      this.fdECGHR = false;
      this.dataECGHR = ['ECGHR', 0, 0, 0, 0, 0];
      this.chartECGHR = c3.generate({
          bindto: '#chartECGHR',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataECGHR
              ],
              type: 'spline'
          },
          point: {
              show: false
          },
          tooltip: {
              show: true,
              format: {
                  title: function(d) {
                      return 'Value ';
                  },
              }
          },
          legend: {
              show: false
          },
          color: {
              pattern: ['#E4A0F7']
          },
          axis: {
              y: {
                  label: {
                      text: 'Voltage (uV)',
                      position: 'outer-middle'
                  },
                  max: 100,
                  min: -100
              },
              x: {
                  label: {
                      text: 'ECG_HR',
                      position: 'inner-top'
                  }
              }
          }
      }); // end fi ECG_HR
      //ECG IMP-RR
      this.fdECGIMP = false;
      this.dataECGIMP = ['ECGIMP', 0, 0, 0, 0, 0];
      this.chartECGIMP = c3.generate({
          bindto: '#chartECGIMP',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataECGIMP
              ],
              type: 'spline'
          },
          point: {
              show: false
          },
          tooltip: {
              show: true,
              format: {
                  title: function(d) {
                      return 'Value ';
                  },
              }
          },
          legend: {
              show: false
          },
          color: {
              pattern: ['#B200ED']
          },
          axis: {
              y: {
                  label: {
                      text: 'Voltage (uV)',
                      position: 'outer-middle'
                  },
                  max: 100,
                  min: -100
              },
              x: {
                  label: {
                      text: 'ECG_IMP-RR',
                      position: 'inner-top'
                  }
              }
          }
      }); // end fi ECG_HR

      //ENTROPY_RE
      this.fdENTROPYRE = false;
      this.dataENTROPYRE = ['ENTROPY_RE', 0, 0, 0, 0, 0];
      this.chartENTROPYRE = c3.generate({
          bindto: '#chartENTROPYRE',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataENTROPYRE
              ],
              type: 'spline'
          },
          tooltip: {
              show: true,

              format: {
                  title: function(d) {
                      return 'Value ';
                  }
              }

          },
          point: {
              show: false
          },
          legend: {
              // position: 'right'
              show: false
          },
          color: {
              pattern: ['#fc6600']
          },
          axis: {
              // stroke: rgb(255,255,255),
              y: {
                  label: {
                      text: 'Percentage (%)',
                      position: 'outer-middle'
                      // inner-top : default
                      // inner-middle
                      // inner-bottom
                      // outer-top
                      // outer-middle
                      // outer-bottom
                  },
                  max: 120,
                  min: -120
              },
              x: {
                  label: {
                      text: 'ENTROPY_RE',
                      position: 'inner-top'
                  }
              }
          }
      });
      //ENTROPY_SE
      this.fdENTROPYSE = false;
      this.dataENTROPYSE = ['ENTROPY_SE', 0, 0, 0, 0, 0];
      this.chartENTROPYSE = c3.generate({
          bindto: '#chartENTROPYSE',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataENTROPYSE
              ],
              type: 'spline'
          },
          tooltip: {
              show: true,
              format: {
                  title: function(d) {
                      return 'Value ';
                  },
              }
          },
          point: {
              show: false
          },
          legend: {
              show: false
          },
          color: {
              pattern: ['#F9812A']
          },
          axis: {
              y: {
                  label: {
                      text: 'Percentage (%)',
                      position: 'outer-middle'
                  },
                  max: 120,
                  min: -120
              },
              x: {
                  label: {
                      text: 'ENTROPY_SE',
                      position: 'inner-top'
                  }
              }
          }
      });
      //ENTROPY_BSR
      this.fdENTROPYBSR = false;
      this.dataENTROPYBSR = ['ENTROPY_BSR', 0, 0, 0, 0, 0];
      this.chartENTROPYBSR = c3.generate({
          bindto: '#chartENTROPYBSR',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataENTROPYBSR
              ],
              type: 'spline'
          },
          tooltip: {
              show: true,
              format: {
                  title: function(d) {
                      return 'Value ';
                  },
              }
          },
          point: {
              show: false
          },
          legend: {
              show: false
          },
          color: {
              pattern: ['#FFBF00']
          },
          axis: {
              y: {
                  label: {
                      text: 'Percentage (%)',
                      position: 'outer-middle'
                  },
                  max: 120,
                  min: -10
              },
              x: {
                  label: {
                      text: 'ENTROPY_BSR',
                      position: 'inner-top'
                  }
              }
          }
      });

      // NIBP MEAN
      this.fdNIBPMEAN = false;
      this.dataNIBPMEAN = ['NIBP_MEAN', 0, 0, 0, 0, 0];
      this.chartNIBPMEAN = c3.generate({
          bindto: '#chartNIBPMEAN',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataNIBPMEAN
              ],
              type: 'spline'
          },
          tooltip: {
              show: true,
              format: {
                  title: function(d) {
                      return 'Value ';
                  },
              }
          },
          point: {
              show: false
          },
          legend: {
              show: false
          },
          color: {
              pattern: ['#89CFEF']
          },
          axis: {
              y: {
                  label: {
                      text: 'Percentage (%)',
                      position: 'outer-middle'
                  },
                  max: 120,
                  min: -10
              },
              x: {
                  label: {
                      text: 'NIBP_MEAN',
                      position: 'inner-top'
                  }
              }
          }
      });
      //NIBP DIA
      this.fdNIBPDIA = false;
      this.dataNIBPDIA = ['NIBP_DIA', 0, 0, 0, 0, 0];
      this.chartNIBPDIA = c3.generate({
          bindto: '#chartNIBPDIA',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataNIBPDIA
              ],
              type: 'spline'
          },
          tooltip: {
              show: true,
              format: {
                  title: function(d) {
                      return 'Value ';
                  },
              }
          },
          point: {
              show: false
          },
          legend: {
              show: false
          },
          color: {
              pattern: ['#95C8D8']
          },
          axis: {
              y: {
                  label: {
                      text: 'Percentage (%)',
                      position: 'outer-middle'
                  },
                  max: 120,
                  min: -10
              },
              x: {
                  label: {
                      text: 'NIBP_DIA',
                      position: 'inner-top'
                  }
              }
          }
      });
      //NIBP SYS
      this.fdNIBPSYS = false;
      this.dataNIBPSYS = ['NIBP_SYS', 0, 0, 0, 0, 0];
      this.chartNIBPSYS = c3.generate({
          bindto: '#chartNIBPSYS',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataNIBPSYS
              ],
              type: 'spline'
          },
          tooltip: {
              show: true,
              format: {
                  title: function(d) {
                      return 'Value ';
                  },
              }
          },
          point: {
              show: false
          },
          legend: {
              show: false
          },
          color: {
              pattern: ['#0080FF']
          },
          axis: {
              y: {
                  label: {
                      text: 'Percentage (%)',
                      position: 'outer-middle'
                  },
                  max: 120,
                  min: -10
              },
              x: {
                  label: {
                      text: 'NIBP_SYS',
                      position: 'inner-top'
                  }
              }
          }
      });
      //TEMP T1
      this.fdTEMPT1 = false;
      this.dataTEMPT1 = ['TEMPT1', 0, 0, 0, 0, 0];
      this.chartTEMPT1 = c3.generate({
          bindto: '#chartTEMPT1',
          size: {
              height: 200,
            //   width: 1080
          },
          data: {
              columns: [
                  this.dataTEMPT1
              ],
              type: 'spline'
          },
          tooltip: {
              show: true,
              format: {
                  title: function(d) {
                      return 'Value ';
                  },
              }
          },
          point: {
              show: false
          },
          legend: {
              show: false
          },
          color: {
              pattern: ['#0080FF']
          },
          axis: {
              y: {
                  label: {
                      text: 'Percentage (%)',
                      position: 'outer-middle'
                  },
                  max: 120,
                  min: -10
              },
              x: {
                  label: {
                      text: 'TEMP T1',
                      position: 'inner-top'
                  }
              }
          }
      });


  }
//   https://otexts.com/fpp2/
// https://bl.ocks.org/pjsier/fbf9317b31f070fd540c5523fef167ac
  ngOnChanges() {
    
    if (!this.isEmpty(this.current_data) && this.current_data["debug"]["command"] == "request_channels") {
        //console.log('EC3-ngOnChanges', this.current_data);
        
        this.current_data["channels"].forEach((currentChannel, index, array) => {
            /*
            * Waves 
            * Pleth, ENT100
            */
            if (currentChannel["label"] == 'PLETH') {
               //console.log('EC3-ngOnChanges PLETH',currentChannel["data"].length);
            this.currentPLETH += this.dataPLETH.length-1;
                if (this.dataPLETH.length <= 125 && this.fdPLETH == false) {
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataPLETH.push(currentChannel["data"][i]);
                    }
                } else {
                    this.dataPLETH = [];
                    this.dataPLETH.push('PLETH');
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataPLETH.push(currentChannel["data"][i]);
                    }
                    this.fdPLETH = true;
                } //end else
                
                let currentLength = currentChannel["data"].length;
                const promise = new Promise((resolve, reject) => {
                    this.chartPLETH.flow({
                        columns: [
                            this.dataPLETH
                        ],
                        duration: 750,
                        length: currentLength
                    });
                });
                promise.catch((err) => {
                    console.log("Promise:",err);
                });   
            } //end fi PLETH
            else if (currentChannel["label"] == 'ENT_100') {
                console.log('EC3-nocENT100',currentChannel);
                if (this.dataENT100.length <= 125 && this.fdENT100 == false) {
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataENT100.push(currentChannel["data"][i]);
                    }
                } else {
                    this.dataENT100 = [];
                    this.dataENT100.push('ENT100');
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataENT100.push(currentChannel["data"][i]);
                    }
                    this.fdENT100 = true;
                } //end esle
                let currentLength = currentChannel["data"].length;
                const promise = new Promise((resolve, reject) => {
                    this.chartENT100.flow({
                        columns: [
                            this.dataENT100
                        ],
                        duration: 750,
                        length: currentLength
                    });
                });
                promise.catch((err) => { console.log("Promise:",err); });
            } //end fi ENT100

            /* Tendencias
            * "CO2 ET", "CO2 FI", 
            * "ECG HR", "ECG IMP-RR", 
            * "ENTROPY BSR", "ENTROPY RE", "ENTROPY SE", 
            * "NIBP DIA", "NIBP MEAN", "NIBP SYS", 
            * "TEMP (t1)"

            */
            else if (currentChannel["label"] == 'ENTROPY RE') {
                // console.log('EC3-nocENTRE',currentChannel);
                if (this.dataENTROPYRE.length <= 5 && this.fdPLETH == false) {
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataENTROPYRE.push(currentChannel["data"][i]);
                    }
                } else {
                    this.dataENTROPYRE = [];
                    this.dataENTROPYRE.push('ENTROPY_RE');
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataENTROPYRE.push(currentChannel["data"][i]);
                    }
                    this.fdENTROPYRE = true;
                } 
            let currentLength = currentChannel["data"].length;
            const promise = new Promise((resolve, reject) => {
                this.chartENTROPYRE.flow({
                    columns: [
                        this.dataENTROPYRE
                    ],
                    duration: 750,
                    length: currentLength
                });
            });
            promise.then((res) => { console.log("Promise:",res); });
            promise.catch((err) => { console.log("Promise:",err); });
            } //end fi ENTROPY RE
            // ENTROPY SE
            else if (currentChannel["label"] == 'ENTROPY SE') {
                // console.log('EC3-nocENTRE',currentChannel);
                if (this.dataENTROPYSE.length <= 5 && this.fdENTROPYSE == false) {
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataENTROPYSE.push(currentChannel["data"][i]);
                    }
                } else {
                    this.dataENTROPYSE = [];
                    this.dataENTROPYSE.push('ENTROPY_SE');
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataENTROPYSE.push(currentChannel["data"][i]);
                    }
                    this.fdENTROPYSE = true;
                } //end esle
            //   this.chartENTROPYSE.flow({
            //       columns: [
            //           this.dataENTROPYSE
            //       ],
            //       duration: 750,
            //       length: currentChannel["data"].length
            //   });
            let currentLength = currentChannel["data"].length;
            const promise = new Promise((resolve, reject) => {
                this.chartENTROPYSE.flow({
                    columns: [
                        this.dataENTROPYSE
                    ],
                    duration: 750,
                    length: currentLength
                });
            });
            promise.then((res) => { console.log("Promise:",res); });
            promise.catch((err) => { console.log("Promise:",err); });
            } //end fi ENTROPY SE
            // ENTROPY BSR
            else if (currentChannel["label"] == 'ENTROPY BSR') {
                // console.log('EC3- BSR', currentChannel);
                if (this.dataENTROPYBSR.length <= 5 && this.fdENTROPYBSR == false) {
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataENTROPYBSR.push(currentChannel["data"][i]);
                    }
                } else {
                    this.dataENTROPYBSR = [];
                    this.dataENTROPYBSR.push('ENTROPY_BSR');
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataENTROPYBSR.push(currentChannel["data"][i]);
                    }
                    this.fdENTROPYBSR = true;
                } //end esle
            let currentLength = currentChannel["data"].length;
            const promise = new Promise((resolve, reject) => {
                this.chartENTROPYBSR.flow({
                    columns: [
                        this.dataENTROPYBSR
                    ],
                    duration: 750,
                    length: currentLength
                });
                resolve("ok");
            });
            promise.catch((err) => { console.log("Promise:",err); });
            } //end fi ENTROPY BSR
            // CO2ET
            else if (currentChannel["label"] == 'CO2 ET') {
                //console.log('EC3-CO2 ET1:',this.dataCO2ET.length,this.currentCO2ET, currentChannel["data"]);
                this.currentCO2ET+=this.dataCO2ET.length-1; // no tener en cuenta la etiqueta del comienzo del vector
               
                if (this.dataCO2ET.length <= 5 && this.fdCO2ET == false) {
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataCO2ET.push(currentChannel["data"][i]);
                    }
                } else {
                    this.dataCO2ET = [];
                    this.dataCO2ET.push('CO2ET');
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataCO2ET.push(currentChannel["data"][i]);
                    }
                    this.fdCO2ET = true;
                } 
                //console.log('EC3-CO2 ET2:',this.dataCO2ET.length,this.currentCO2ET, currentChannel["data"]);
                let  currentLength = currentChannel["data"].length;  
                const promise = new Promise((resolve, reject) => {
                    this.chartCO2ET.flow({
                        columns: [
                            this.dataCO2ET
                        ],
                        duration: 750,
                        length: currentLength
                    });
                    resolve("ok");
                });
                promise.catch((err) => { console.log("Promise:",err); });
            } //end fi CO2ET
            // CO2FI
            else if (currentChannel["label"] == 'CO2 FI') {
            //console.log('EC3-CO2 FI ',currentChannel);
            if (this.dataCO2FI.length <= 5 && this.fdCO2FI == false) {
                for (let i = 0; i < currentChannel["data"].length; i += 1) {
                    this.dataCO2FI.push(currentChannel["data"][i]);
                }
            } else {
                this.dataCO2FI = [];
                this.dataCO2FI.push('CO2FI');
                for (let i = 0; i < currentChannel["data"].length; i += 1) {
                    this.dataCO2FI.push(currentChannel["data"][i]);
                }
                this.fdCO2FI = true;
            } //end esle
            let currentLength = currentChannel["data"].length;
            const promise = new Promise((resolve, reject) => {
                this.chartCO2FI.flow({
                    columns: [
                        this.dataCO2FI
                    ],
                    duration: 750,
                    length: currentLength
                });
                resolve("ok");
            });
            promise.catch((err) => { console.log("Promise:",err); });
            } //end fi CO2FI
            // ECGHR
            else if (currentChannel["label"] == 'ECG HR') {
                //  console.log('EC3-nocENTRE',currentChannel);
                if (this.dataECGHR.length <= 5 && this.fdECGHR == false) {
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataECGHR.push(currentChannel["data"][i]);
                    }
                } else {
                    this.dataECGHR = [];
                    this.dataECGHR.push('ECGHR');
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataECGHR.push(currentChannel["data"][i]);
                    }
                    this.fdECGHR = true;
                } //end esle
            let currentLength = currentChannel["data"].length;
            const promise = new Promise((resolve, reject) => {
                this.chartECGHR.flow({
                    columns: [
                        this.dataECGHR
                    ],
                    duration: 750,
                    length: currentLength
                });
                resolve("ok");
            });
            promise.catch((err) => { console.log("Promise:",err); });
            } //end fi ECGHR
            // ECGIMP
            else if (currentChannel["label"] == 'ECG IMP-RR') {
                //  console.log('EC3-nocENTRE',currentChannel);
                if (this.dataECGIMP.length <= 5 && this.fdECGIMP == false) {
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataECGIMP.push(currentChannel["data"][i]);
                    }
                } else {
                    this.dataECGIMP = [];
                    this.dataECGIMP.push('ECGIMP');
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataECGIMP.push(currentChannel["data"][i]);
                    }
                    this.fdECGIMP = true;
                } //end esle
            let currentLength = currentChannel["data"].length;
            const promise = new Promise((resolve, reject) => {
                this.chartECGIMP.flow({
                    columns: [
                        this.dataECGIMP
                    ],
                    duration: 750,
                    length: currentLength
                });
                resolve("ok");
            });
            promise.catch((err) => { console.log("Promise:",err); });
            } //end fi ECGIMP
            // NIBP MEAN
            else if (currentChannel["label"] == 'NIBP MEAN') {
                //  console.log('EC3-nocENTRE',currentChannel);
                if (this.dataNIBPMEAN.length <= 5 && this.fdNIBPMEAN == false) {
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataNIBPMEAN.push(currentChannel["data"][i]);
                    }
                } else {
                    this.dataNIBPMEAN = [];
                    this.dataNIBPMEAN.push('NIBP_MEAN');
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataNIBPMEAN.push(currentChannel["data"][i]);
                    }
                    this.fdNIBPMEAN = true;
                } //end esle
                let currentLength = currentChannel["data"].length;
                const promise = new Promise((resolve, reject) => {
                    this.chartNIBPMEAN.flow({
                    columns: [
                        this.dataNIBPMEAN
                    ],
                    duration: 750,
                    length: currentLength
                    });
                    resolve("ok");
                });
                promise.catch((err) => { console.log("Promise:",err); });
            } //end fi NIBPMEAN
            // NIBP DIA
            else if (currentChannel["label"] == 'NIBP DIA') {
                //  console.log('EC3-nocENTRE',currentChannel);
                if (this.dataNIBPDIA.length <= 5 && this.fdNIBPDIA == false) {
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataNIBPDIA.push(currentChannel["data"][i]);
                    }
                } else {
                    this.dataNIBPDIA = [];
                    this.dataNIBPDIA.push('NIBP_DIA');
                    for (let i = 0; i < currentChannel["data"].length; i += 1) {
                        this.dataNIBPDIA.push(currentChannel["data"][i]);
                    }
                    this.fdNIBPDIA = true;
                } //end esle
                let currentLength = currentChannel["data"].length;
                const promise = new Promise((resolve, reject) => {
                    this.chartNIBPDIA.flow({
                        columns: [
                            this.dataNIBPDIA
                        ],
                    duration: 750,
                    length: currentLength
                    });
                    resolve("ok");
                });
                promise.catch((err) => { console.log("Promise:",err); });
            } //end fi NIBPDIA
            // NIBP SYS
            else if (currentChannel["label"] == 'NIBP SYS') {
            //  console.log('EC3-nocENTRE',currentChannel);
            if (this.dataNIBPSYS.length <= 5 && this.fdNIBPSYS == false) {
                for (let i = 0; i < currentChannel["data"].length; i += 1) {
                    this.dataNIBPSYS.push(currentChannel["data"][i]);
                }
            } else {
                this.dataNIBPSYS = [];
                this.dataNIBPSYS.push('NIBP_SYS');
                for (let i = 0; i < currentChannel["data"].length; i += 1) {
                    this.dataNIBPSYS.push(currentChannel["data"][i]);
                }
                this.fdNIBPSYS = true;
            } //end esle
            let currentLength = currentChannel["data"].length;
            const promise = new Promise((resolve, reject) => {
                this.chartNIBPSYS.flow({
                    columns: [
                        this.dataNIBPSYS
                    ],
                    duration: 750,
                    length: currentLength
                });
                resolve("ok");
            });
            promise.catch((err) => { console.log("chartNIBPSYS promise:",err); });
            
        } //end fi NIBPSYS
        // NIBP SYS
        else if (currentChannel["label"] == 'TEMP (t1)') {
            // console.log('EC3- T1',currentChannel);
            if (this.dataTEMPT1.length <= 5 && this.fdTEMPT1 == false) {
                
                for (let i = 0; i < currentChannel["data"].length; i += 1) {
                    this.dataTEMPT1.push(currentChannel["data"][i]);
                }
            } else {
                this.dataTEMPT1 = [];
                this.dataTEMPT1.push('TEMPT1');
                for (let i = 0; i < currentChannel["data"].length; i += 1) {
                    this.dataTEMPT1.push(currentChannel["data"][i]);
                }
                this.fdTEMPT1 = true;
            } //end esle
            let currentLength = currentChannel["data"].length;
            const promise = new Promise((resolve, reject) => {
                this.chartTEMPT1.flow({
                    columns: [
                        this.dataTEMPT1
                    ],
                    duration: 750,
                    length: currentLength
                });
                resolve('ok');
            });
            promise.catch((err) => { console.log("Promise:",err); });
        } //end fi TEMPT1
    });

        if (this.current_data["annotations"]["size"]!=this.annotIdx){
            console.log('EC3-ngOnChanges new annotation detected',this.currentPLETH,this.currentCO2ET);
            this.annotIdx+=1;
            this.chartPLETH.xgrids.add([
                {value: this.currentPLETH, text: this.annotIdx}
            ]);
            this.chartCO2ET.xgrids.add([
                {value: this.currentCO2ET, text: this.annotIdx}
            ]);
        }
    }

    
  }

  ngAfterViewInit() {

  }

  onAddClick(event) {
  }

  getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }

  isEmpty(obj) {
      return Object.keys(obj).every(k => !Object.keys(obj[k]).length)
  }



}