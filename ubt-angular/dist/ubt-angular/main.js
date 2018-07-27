(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\r\n  color: white;\r\n}\r\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<!-- Stack the columns on mobile by making one full-width and the other half-width -->\r\n<div class=\"container-fluid\">\r\n<div class=\"row main-container\" >\r\n  <div class=\"col-12 col-md-12\">\r\n      <app-title-bar-component></app-title-bar-component>\r\n  </div>\r\n</div>\r\n<div class=\"row main-container\">\r\n  <div class=\"col\">\r\n      <app-principal-content-component [Status]='StatusControl' [Command]='CommandControl'></app-principal-content-component>\r\n  </div>\r\n</div>\r\n<div class=\"row main-container\" style=\"padding: 10px 0px 0px 0px\">\r\n  <div class=\"col\">\r\n    <app-control-bar-component (StatusEvent)='onChangeStatus($event)'  (CoomandEvent)='onCommandReceived($event)'></app-control-bar-component>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
        this.StatusControl = 0;
    }
    AppComponent.prototype.onChangeStatus = function (event) {
        this.StatusControl = event;
    };
    AppComponent.prototype.onCommandReceived = function (event) {
        this.CommandControl = event;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.control.bar.component/app.control.bar.component.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/app.control.bar.component/app.control.bar.component.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.control.bar.component/app.control.bar.component.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/app.control.bar.component.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container control-bar\">\r\n  <div class=\"row main-container\">\r\n      <div class=\"col-5 col-md-5\">\r\n        <app-edf-position-bar></app-edf-position-bar>\r\n      </div>\r\n      <div class=\"col-3 col-md-3\">\r\n        <app-edf-control-buttons (goBackward)='onGoBack($event)' (goForward)='onGoForwd($event)'></app-edf-control-buttons>\r\n      </div>\r\n      <div class=\"col-4 col-md-4\">\r\n        <app-edf-menu-bar (esiclick)='onESILoad($event)' (planeclick)='onPlaneLoad($event)' (annoclick)='onAnnoLoad($event)' (openclick)='onOpenEDF($event)' (filterclick)='onFilter($event)' (clearclick)='onClear($event)'></app-edf-menu-bar>\r\n      </div>\r\n  </div>\r\n"

/***/ }),

/***/ "./src/app/app.control.bar.component/app.control.bar.component.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/app.control.bar.component/app.control.bar.component.component.ts ***!
  \**********************************************************************************/
/*! exports provided: AppControlBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppControlBarComponent", function() { return AppControlBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_services_d3_d3_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app.services/d3/d3.service */ "./src/app/app.services/d3/d3.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppControlBarComponent = /** @class */ (function () {
    function AppControlBarComponent(d3Service) {
        this.d3Service = d3Service;
        this.StatusEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.CoomandEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.status = 0;
        this.ESIToggle = false;
        this.PlaneToggle = false;
        this.AnnotToggle = false;
        this.TopoPlotToggle = false;
        this.status = -1;
    }
    AppControlBarComponent.prototype.checkStatus = function (ESIToggle, PlaneToggle, AnnotToggle, TopoPlotToggle) {
        if (AnnotToggle === true) {
            return 3;
        }
        else {
            if (PlaneToggle === true) {
                return 2;
            }
            else {
                if (ESIToggle === true) {
                    return 1;
                }
                return 0;
            }
        }
    };
    AppControlBarComponent.prototype.onESILoad = function (event) {
        if (this.ESIToggle === true) {
            this.ESIToggle = false;
        }
        else {
            this.ESIToggle = true;
        }
        this.status = this.checkStatus(this.ESIToggle, this.PlaneToggle, this.AnnotToggle, this.TopoPlotToggle);
        this.StatusEvent.emit(this.status);
    };
    AppControlBarComponent.prototype.onPlaneLoad = function (event) {
        if (this.PlaneToggle === true) {
            this.PlaneToggle = false;
        }
        else {
            this.PlaneToggle = true;
        }
        this.status = this.checkStatus(this.ESIToggle, this.PlaneToggle, this.AnnotToggle, this.TopoPlotToggle);
        this.StatusEvent.emit(this.status);
    };
    AppControlBarComponent.prototype.onAnnoLoad = function (event) {
        if (this.AnnotToggle === true) {
            this.AnnotToggle = false;
        }
        else {
            this.AnnotToggle = true;
        }
        this.status = this.checkStatus(this.ESIToggle, this.PlaneToggle, this.AnnotToggle, this.TopoPlotToggle);
        this.StatusEvent.emit(this.status);
    };
    AppControlBarComponent.prototype.onFilter = function (event) {
        this.CoomandEvent.emit([0, 0]);
    };
    AppControlBarComponent.prototype.onClear = function (event) {
        this.CoomandEvent.emit([1, 0]);
    };
    AppControlBarComponent.prototype.onOpenEDF = function (event) {
        this.CoomandEvent.emit([2, event]);
    };
    AppControlBarComponent.prototype.onGoBack = function (event) {
        this.CoomandEvent.emit([3, event]);
    };
    AppControlBarComponent.prototype.onGoForwd = function (event) {
        this.CoomandEvent.emit([4, event]);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AppControlBarComponent.prototype, "StatusEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AppControlBarComponent.prototype, "CoomandEvent", void 0);
    AppControlBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-control-bar-component',
            template: __webpack_require__(/*! ./app.control.bar.component.component.html */ "./src/app/app.control.bar.component/app.control.bar.component.component.html"),
            styles: [__webpack_require__(/*! ./app.control.bar.component.component.css */ "./src/app/app.control.bar.component/app.control.bar.component.component.css")]
        }),
        __metadata("design:paramtypes", [_app_services_d3_d3_service__WEBPACK_IMPORTED_MODULE_1__["D3Service"]])
    ], AppControlBarComponent);
    return AppControlBarComponent;
}());



/***/ }),

/***/ "./src/app/app.control.bar.component/edf-control-bar/edf-control-bar.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-control-bar/edf-control-bar.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.control.bar.component/edf-control-bar/edf-control-bar.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-control-bar/edf-control-bar.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  edf-control-bar works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/app.control.bar.component/edf-control-bar/edf-control-bar.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-control-bar/edf-control-bar.component.ts ***!
  \****************************************************************************************/
/*! exports provided: EdfControlBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdfControlBarComponent", function() { return EdfControlBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EdfControlBarComponent = /** @class */ (function () {
    function EdfControlBarComponent() {
    }
    EdfControlBarComponent.prototype.ngOnInit = function () {
    };
    EdfControlBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edf-control-bar',
            template: __webpack_require__(/*! ./edf-control-bar.component.html */ "./src/app/app.control.bar.component/edf-control-bar/edf-control-bar.component.html"),
            styles: [__webpack_require__(/*! ./edf-control-bar.component.css */ "./src/app/app.control.bar.component/edf-control-bar/edf-control-bar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EdfControlBarComponent);
    return EdfControlBarComponent;
}());



/***/ }),

/***/ "./src/app/app.control.bar.component/edf-control-buttons/edf-control-buttons.component.css":
/*!*************************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-control-buttons/edf-control-buttons.component.css ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* Container needed to position the button. Adjust the width as needed */\r\n.container {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 100%;\r\n  }\r\n/* Make the image responsive */\r\n.container img {\r\n    width: 100%;\r\n    height: 100%;\r\n  }\r\n/* Style the button and place it in the middle of the container/image */\r\n.container .btn {\r\n    position: relative;\r\n    top: 50%;\r\n    left: 50%;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\r\n    -ms-transform: translate(-50%, -50%);\r\n    background-color: #000;\r\n    color: white;\r\n    font-size: 6px;\r\n    padding: 0px 0px;\r\n    border: none;\r\n    cursor: pointer;\r\n    border-radius: 0px;\r\n    width: 38px;\r\n    height: 38px;\r\n  }\r\n.container .row {\r\n    height: 45px;\r\n  }\r\n.container .btn:hover {\r\n    background-color: black;\r\n  }\r\n.speed {\r\n      font-size: 12px;\r\n      text-align: center;\r\n      padding-left: 20%;\r\n  }\r\n.material-cust-small-button {\r\n  width: auto;\r\n  min-width: 1%;\r\n  vertical-align: middle;\r\n}\r\n.material-cust-small-button-icon {\r\n  width: auto;\r\n  min-width: 1%;\r\n  vertical-align: middle;\r\n}"

/***/ }),

/***/ "./src/app/app.control.bar.component/edf-control-buttons/edf-control-buttons.component.html":
/*!**************************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-control-buttons/edf-control-buttons.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"row main-container\">\r\n    <div class=\"col-3 col-md-3\">\r\n      <button mat-stroked-button (click)=\"Backward($event)\" class=\"material-cust-small-button\">\r\n        <mat-icon class=\"material-cust-small-button-icon\">arrow_back</mat-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"col-3 col-md-3\">\r\n      <button mat-stroked-button (click)=\"Forward($event)\" class=\"material-cust-small-button\">\r\n        <mat-icon class=\"material-cust-small-button-icon\">arrow_forward</mat-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"col-3 col-md-3\">\r\n        <button mat-stroked-button (click)=\"changeStep($event, false)\" class=\"material-cust-small-button\">\r\n            <mat-icon class=\"material-cust-small-button-icon\">remove</mat-icon>\r\n          </button>\r\n    </div>\r\n    <div class=\"col-3 col-md-3\">\r\n        <button mat-stroked-button (click)=\"changeStep($event, true)\" class=\"material-cust-small-button\">\r\n            <mat-icon class=\"material-cust-small-button-icon\">add</mat-icon>\r\n          </button>\r\n      </div>\r\n  </div>\r\n  <div class=\"row main-container\">\r\n    <div class=\"col-6 col-md-6 text-center\"><p class=\"speed\"></p></div>\r\n    <div class=\"col-6 col-md-6 text-center\">\r\n      <p class=\"speed\">\r\n        {{this.step[this.stepPos]}}x</p>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n "

/***/ }),

/***/ "./src/app/app.control.bar.component/edf-control-buttons/edf-control-buttons.component.ts":
/*!************************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-control-buttons/edf-control-buttons.component.ts ***!
  \************************************************************************************************/
/*! exports provided: EdfControlButtonsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdfControlButtonsComponent", function() { return EdfControlButtonsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EdfControlButtonsComponent = /** @class */ (function () {
    function EdfControlButtonsComponent() {
        this.goBackward = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.goForward = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.step = [1, 10, 100];
        this.stepPos = 0;
    }
    EdfControlButtonsComponent.prototype.Backward = function (event, step) {
        if (step === void 0) { step = this.step[this.stepPos]; }
        this.goBackward.emit(step);
    };
    EdfControlButtonsComponent.prototype.Forward = function (event, step) {
        if (step === void 0) { step = this.step[this.stepPos]; }
        this.goForward.emit(step);
    };
    EdfControlButtonsComponent.prototype.changeStep = function (event, direction) {
        if (direction) {
            if (this.stepPos === this.step.length - 1) {
                this.stepPos = this.step.length - 1;
            }
            else {
                this.stepPos++;
            }
        }
        else {
            if (this.stepPos === 0) {
                this.stepPos = 0;
            }
            else {
                this.stepPos--;
            }
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EdfControlButtonsComponent.prototype, "goBackward", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EdfControlButtonsComponent.prototype, "goForward", void 0);
    EdfControlButtonsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edf-control-buttons',
            template: __webpack_require__(/*! ./edf-control-buttons.component.html */ "./src/app/app.control.bar.component/edf-control-buttons/edf-control-buttons.component.html"),
            styles: [__webpack_require__(/*! ./edf-control-buttons.component.css */ "./src/app/app.control.bar.component/edf-control-buttons/edf-control-buttons.component.css")]
        })
    ], EdfControlButtonsComponent);
    return EdfControlButtonsComponent;
}());



/***/ }),

/***/ "./src/app/app.control.bar.component/edf-menu-bar/edf-menu-bar.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-menu-bar/edf-menu-bar.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* Container needed to position the button. Adjust the width as needed */\r\n.container {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 100%;\r\n  }\r\n/* Make the image responsive */\r\n.container img {\r\n    width: 100%;\r\n    height: 100%;\r\n  }\r\n/* Style the button and place it in the middle of the container/image */\r\n.container .btn {\r\n      position: relative;\r\n      top: 50%;\r\n      left: 50%;\r\n      -webkit-transform: translate(-50%, -50%);\r\n              transform: translate(-50%, -50%);\r\n      -ms-transform: translate(-50%, -50%);\r\n      background-color: black;\r\n      color: white;\r\n      font-size: 6px;\r\n      padding: 1px 1px;\r\n      border: 1px solid white;\r\n      cursor: pointer;\r\n      border-radius: 0%;\r\n      width: 35px;\r\n      height: 35px;\r\n    }\r\n.container .btn:hover {\r\n      border: 1px solid red;\r\n    }\r\n.speed p{\r\n      font-size: 8px;\r\n      text-align: justify;\r\n      padding-left: 50%;\r\n      height: 15px;\r\n    }\r\n.material-cust-small-button {\r\n      width: auto;\r\n      min-width: 1%;\r\n      vertical-align: middle;\r\n    }\r\n.material-cust-small-button-icon {\r\n      width: auto;\r\n      min-width: 1%;\r\n      vertical-align: middle;\r\n    }\r\n.material-cust-small-input .inputfile + label {\r\n      width: 100px;\r\n      min-width: 1%;\r\n      vertical-align: middle;\r\n      opacity: 100%;\r\n    }\r\n.inputfile + label {\r\n      display: none;\r\n    }"

/***/ }),

/***/ "./src/app/app.control.bar.component/edf-menu-bar/edf-menu-bar.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-menu-bar/edf-menu-bar.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"row\">\r\n    <div class=\"col-2 col-md-2 speed\">\r\n      <p>View Anno</p>\r\n    </div>\r\n    <div class=\"col-2 col-md-2 speed\">\r\n      <p class=\"speed\">Open EDF</p>\r\n    </div>\r\n    <div class=\"col-2 col-md-2 speed\">\r\n      <p>Clear</p>\r\n    </div>\r\n    <div class=\"col-2 col-md-2 speed\"> \r\n      <p>Filter</p>\r\n    </div>\r\n    <div class=\"col-2 col-md-2 speed\">\r\n      <p>ESI</p>\r\n    </div>\r\n    <div class=\"col-2 col-md-2 speed\">\r\n      <p>Load MRI</p>\r\n    </div>\r\n  </div>\r\n  <div class=\"row main-container\">\r\n    <div class=\"col-2 col-md-2\">\r\n      <button mat-stroked-button (click)=\"AnnoLoad()\" class=\"material-cust-small-button\">\r\n        <mat-icon class=\"material-cust-small-button-icon\">edit</mat-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"col-2 col-md-2\">\r\n      <input id=\"fileInput\" name=\"file\" type=\"file\" (change)=\"OpenEDF($event)\" [hidden]=\"true\" #fileinput>\r\n      <button mat-stroked-button (click)=\"SelectFiles(fileinput)\" class=\"material-cust-small-button\">\r\n          <mat-icon class=\"material-cust-small-button-icon\">folder_open</mat-icon>\r\n        </button>\r\n    </div>\r\n    <div class=\"col-2 col-md-2\">\r\n      <button mat-stroked-button (click)=\"Clear()\" class=\"material-cust-small-button\">\r\n        <mat-icon class=\"material-cust-small-button-icon\">remove</mat-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"col-2 col-md-2\">\r\n      <button mat-stroked-button (click)=\"Filter()\" class=\"material-cust-small-button\">\r\n        <mat-icon class=\"material-cust-small-button-icon\">filter</mat-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"col-2 col-md-2\">\r\n      <button mat-stroked-button (click)=\"ESILoad()\" class=\"material-cust-small-button\">\r\n        <mat-icon class=\"material-cust-small-button-icon\">image_search</mat-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"col-2 col-md-2\">\r\n      <button mat-stroked-button (click)=\"PlaneLoad()\" class=\"material-cust-small-button\">\r\n        <mat-icon class=\"material-cust-small-button-icon\">image</mat-icon>\r\n      </button>\r\n    </div>  \r\n  </div>\r\n</div>\r\n  "

/***/ }),

/***/ "./src/app/app.control.bar.component/edf-menu-bar/edf-menu-bar.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-menu-bar/edf-menu-bar.component.ts ***!
  \**********************************************************************************/
/*! exports provided: EdfMenuBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdfMenuBarComponent", function() { return EdfMenuBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EdfMenuBarComponent = /** @class */ (function () {
    function EdfMenuBarComponent() {
        this.esiclick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.planeclick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.annoclick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.clearclick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.filterclick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.openclick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    EdfMenuBarComponent.prototype.ESILoad = function (event) {
        this.esiclick.emit(event);
    };
    EdfMenuBarComponent.prototype.PlaneLoad = function (event) {
        this.planeclick.emit(event);
    };
    EdfMenuBarComponent.prototype.AnnoLoad = function (event) {
        this.annoclick.emit(event);
    };
    EdfMenuBarComponent.prototype.Clear = function (event) {
        this.clearclick.emit(event);
    };
    EdfMenuBarComponent.prototype.Filter = function (event) {
        this.filterclick.emit(event);
    };
    EdfMenuBarComponent.prototype.OpenEDF = function (event) {
        this.openclick.emit(event['target']['value']);
    };
    EdfMenuBarComponent.prototype.SelectFiles = function (event) {
        event.click();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EdfMenuBarComponent.prototype, "esiclick", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EdfMenuBarComponent.prototype, "planeclick", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EdfMenuBarComponent.prototype, "annoclick", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EdfMenuBarComponent.prototype, "clearclick", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EdfMenuBarComponent.prototype, "filterclick", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EdfMenuBarComponent.prototype, "openclick", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileinput'),
        __metadata("design:type", Object)
    ], EdfMenuBarComponent.prototype, "fileinput", void 0);
    EdfMenuBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edf-menu-bar',
            template: __webpack_require__(/*! ./edf-menu-bar.component.html */ "./src/app/app.control.bar.component/edf-menu-bar/edf-menu-bar.component.html"),
            styles: [__webpack_require__(/*! ./edf-menu-bar.component.css */ "./src/app/app.control.bar.component/edf-menu-bar/edf-menu-bar.component.css")]
        })
    ], EdfMenuBarComponent);
    return EdfMenuBarComponent;
}());



/***/ }),

/***/ "./src/app/app.control.bar.component/edf-position-bar/edf-position-bar.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-position-bar/edf-position-bar.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.control.bar.component/edf-position-bar/edf-position-bar.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-position-bar/edf-position-bar.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center\">\r\n        <mat-progress-bar mode=\"indeterminate\" style=\"height: 50px;\"></mat-progress-bar>\r\n</div>"

/***/ }),

/***/ "./src/app/app.control.bar.component/edf-position-bar/edf-position-bar.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/app.control.bar.component/edf-position-bar/edf-position-bar.component.ts ***!
  \******************************************************************************************/
/*! exports provided: EdfPositionBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EdfPositionBarComponent", function() { return EdfPositionBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EdfPositionBarComponent = /** @class */ (function () {
    function EdfPositionBarComponent() {
    }
    EdfPositionBarComponent.prototype.ngOnInit = function () {
    };
    EdfPositionBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-edf-position-bar',
            template: __webpack_require__(/*! ./edf-position-bar.component.html */ "./src/app/app.control.bar.component/edf-position-bar/edf-position-bar.component.html"),
            styles: [__webpack_require__(/*! ./edf-position-bar.component.css */ "./src/app/app.control.bar.component/edf-position-bar/edf-position-bar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EdfPositionBarComponent);
    return EdfPositionBarComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _app_title_bar_component_app_title_bar_component_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.title.bar.component/app.title.bar.component.component */ "./src/app/app.title.bar.component/app.title.bar.component.component.ts");
/* harmony import */ var _app_principal_content_component_app_principal_content_component_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.principal.content.component/app.principal.content.component.component */ "./src/app/app.principal.content.component/app.principal.content.component.component.ts");
/* harmony import */ var _app_control_bar_component_app_control_bar_component_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.control.bar.component/app.control.bar.component.component */ "./src/app/app.control.bar.component/app.control.bar.component.component.ts");
/* harmony import */ var _app_principal_content_component_eeg_content_eeg_content_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.principal.content.component/eeg-content/eeg-content.component */ "./src/app/app.principal.content.component/eeg-content/eeg-content.component.ts");
/* harmony import */ var _app_principal_content_component_topo_plot_topo_plot_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.principal.content.component/topo-plot/topo-plot.component */ "./src/app/app.principal.content.component/topo-plot/topo-plot.component.ts");
/* harmony import */ var _app_principal_content_component_td_content_td_content_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.principal.content.component/td-content/td-content.component */ "./src/app/app.principal.content.component/td-content/td-content.component.ts");
/* harmony import */ var _app_principal_content_component_td_control_td_control_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.principal.content.component/td-control/td-control.component */ "./src/app/app.principal.content.component/td-control/td-control.component.ts");
/* harmony import */ var _app_control_bar_component_edf_position_bar_edf_position_bar_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.control.bar.component/edf-position-bar/edf-position-bar.component */ "./src/app/app.control.bar.component/edf-position-bar/edf-position-bar.component.ts");
/* harmony import */ var _app_control_bar_component_edf_control_bar_edf_control_bar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./app.control.bar.component/edf-control-bar/edf-control-bar.component */ "./src/app/app.control.bar.component/edf-control-bar/edf-control-bar.component.ts");
/* harmony import */ var _app_control_bar_component_edf_menu_bar_edf_menu_bar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./app.control.bar.component/edf-menu-bar/edf-menu-bar.component */ "./src/app/app.control.bar.component/edf-menu-bar/edf-menu-bar.component.ts");
/* harmony import */ var _app_control_bar_component_edf_control_buttons_edf_control_buttons_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.control.bar.component/edf-control-buttons/edf-control-buttons.component */ "./src/app/app.control.bar.component/edf-control-buttons/edf-control-buttons.component.ts");
/* harmony import */ var _app_principal_content_component_plane_view_plane_view_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./app.principal.content.component/plane-view/plane-view.component */ "./src/app/app.principal.content.component/plane-view/plane-view.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _app_services_d3_d3_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./app.services/d3/d3.service */ "./src/app/app.services/d3/d3.service.ts");
/* harmony import */ var ng_io__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng-io */ "./node_modules/ng-io/fesm5/ng-io.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var config = { url: 'http://localhost:3300', options: {} };

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _app_control_bar_component_app_control_bar_component_component__WEBPACK_IMPORTED_MODULE_5__["AppControlBarComponent"],
                _app_principal_content_component_app_principal_content_component_component__WEBPACK_IMPORTED_MODULE_4__["AppPrincipalContentComponent"],
                _app_title_bar_component_app_title_bar_component_component__WEBPACK_IMPORTED_MODULE_3__["AppTitleBarComponent"],
                _app_principal_content_component_eeg_content_eeg_content_component__WEBPACK_IMPORTED_MODULE_6__["EegContentComponent"],
                _app_principal_content_component_topo_plot_topo_plot_component__WEBPACK_IMPORTED_MODULE_7__["TopoPlotComponent"],
                _app_principal_content_component_td_content_td_content_component__WEBPACK_IMPORTED_MODULE_8__["TdContentComponent"],
                _app_principal_content_component_td_control_td_control_component__WEBPACK_IMPORTED_MODULE_9__["TdControlComponent"],
                _app_control_bar_component_edf_position_bar_edf_position_bar_component__WEBPACK_IMPORTED_MODULE_10__["EdfPositionBarComponent"],
                _app_control_bar_component_edf_control_bar_edf_control_bar_component__WEBPACK_IMPORTED_MODULE_11__["EdfControlBarComponent"],
                _app_control_bar_component_edf_menu_bar_edf_menu_bar_component__WEBPACK_IMPORTED_MODULE_12__["EdfMenuBarComponent"],
                _app_control_bar_component_edf_control_buttons_edf_control_buttons_component__WEBPACK_IMPORTED_MODULE_13__["EdfControlButtonsComponent"],
                _app_principal_content_component_plane_view_plane_view_component__WEBPACK_IMPORTED_MODULE_14__["PlaneViewComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_20__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_20__["MatToolbarModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_16__["HttpClientModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_20__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_20__["MatIconModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_17__["HttpModule"],
                ng_io__WEBPACK_IMPORTED_MODULE_19__["NgIoModule"].forRoot(config)
            ],
            providers: [_app_services_d3_d3_service__WEBPACK_IMPORTED_MODULE_18__["D3Service"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.principal.content.component/app.principal.content.component.component.css":
/*!***********************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/app.principal.content.component.component.css ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-panel {\r\n  background-color: rgb(25, 25, 25);\r\n}\r\n\r\n.eeg-content-container {\r\n  background-color: rgb(25, 25, 25);\r\n}\r\n\r\n.topo-plot-container {\r\n  background-color: rgb(255, 0, 255);\r\n}\r\n\r\n.td-content-container {\r\n  background-color: rgb(50, 50, 50);\r\n  border-style: solid;\r\n  border-width: 1px;\r\n  border-color: blue;\r\n}\r\n\r\n.plane-view-container {\r\n  background-color: rgb(0, 0, 0);\r\n  border-style: solid;\r\n  border-width: 1px;\r\n  border-color: red;\r\n}\r\n\r\n.layout0 {\r\n  width: 100%;\r\n  height: 530px;\r\n}\r\n\r\n.layout1-0 {\r\n  width: 40%;\r\n  height: 530px;\r\n}\r\n\r\n.layout-2-1 {\r\n  height: 530px;\r\n}"

/***/ }),

/***/ "./src/app/app.principal.content.component/app.principal.content.component.component.html":
/*!************************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/app.principal.content.component.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container content-panel\">\r\n  <div class=\"row main-container\" [ngClass]=\"{'layout-2-1':Status === 2}\">\r\n    <div class=\"col plane-view-container\" *ngIf=\"visPlane\">\r\n        <app-plane-view [srcImage]=\"srcImageAxial\"></app-plane-view>\r\n    </div>\r\n    <div class=\"container-fluid eeg-content-container\" *ngIf=\"visEEG\" [ngClass]=\"{'layout1-0':Status === 1}\">\r\n      <app-eeg-content  [Command_eeg]='Command_Control' [EEG_Status_eeg]='Status'></app-eeg-content>\r\n    </div>\r\n    <div class=\"col topo-plot-container\" *ngIf=\"visTopoPLot\">\r\n      <app-topo-plot></app-topo-plot>\r\n    </div>\r\n    <div class=\"col td-content-container\" *ngIf=\"visESI\">\r\n      <app-td-content></app-td-content>\r\n    </div>\r\n  </div>\r\n  <div class=\"row main-container\" *ngIf=\"visPlane\">\r\n    <div class=\"col plane-view-container\">\r\n        <app-plane-view [srcImage]=\"srcImageSagital\"></app-plane-view>\r\n    </div>\r\n    <div class=\"col plane-view-container\">\r\n        <app-plane-view [srcImage]=\"srcImageCoronal\"></app-plane-view>\r\n    </div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/app.principal.content.component/app.principal.content.component.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/app.principal.content.component.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: AppPrincipalContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppPrincipalContentComponent", function() { return AppPrincipalContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppPrincipalContentComponent = /** @class */ (function () {
    function AppPrincipalContentComponent() {
        this.Command = -1;
        this.srcImageSagital = './assets/brain-dummy/MRISagital.png';
        this.srcImageAxial = './assets/brain-dummy/MRIAxial.png';
        this.srcImageCoronal = './assets/brain-dummy/MRICoronal_2.jpg';
    }
    AppPrincipalContentComponent.prototype.ngOnInit = function () {
        this.Status = 0;
        this.visAnno = false;
        this.visEEG = true;
        this.visESI = false;
        this.visTopoPLot = false;
        this.visPlane = false;
    };
    AppPrincipalContentComponent.prototype.ngOnChanges = function () {
        if (this.Command !== -1) {
            this.Command_Control = this.Command;
        }
        if (this.Status === 0) {
            this.visEEG = true;
            this.visESI = false;
            this.visPlane = false;
        }
        if (this.Status === 1) {
            this.visEEG = true;
            this.visESI = true;
            this.visPlane = false;
        }
        if (this.Status === 2) {
            this.visEEG = false;
            this.visESI = true;
            this.visPlane = true;
        }
        if (this.Status === 3) {
            this.visEEG = false;
            this.visESI = true;
            this.visPlane = true;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], AppPrincipalContentComponent.prototype, "Status", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AppPrincipalContentComponent.prototype, "Command", void 0);
    AppPrincipalContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-principal-content-component',
            template: __webpack_require__(/*! ./app.principal.content.component.component.html */ "./src/app/app.principal.content.component/app.principal.content.component.component.html"),
            styles: [__webpack_require__(/*! ./app.principal.content.component.component.css */ "./src/app/app.principal.content.component/app.principal.content.component.component.css")]
        })
    ], AppPrincipalContentComponent);
    return AppPrincipalContentComponent;
}());



/***/ }),

/***/ "./src/app/app.principal.content.component/eeg-content/eeg-content.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/eeg-content/eeg-content.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".material-cust-small-button {\r\n    width: auto;\r\n    min-width: 1%;\r\n    vertical-align: middle;\r\n  }\r\n  \r\n  .material-cust-small-button-icon {\r\n    width: auto;\r\n    min-width: 1%;\r\n    vertical-align: middle;\r\n  }"

/***/ }),

/***/ "./src/app/app.principal.content.component/eeg-content/eeg-content.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/eeg-content/eeg-content.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col\">\r\n            <button mat-stroked-button (click)=\"click_multiplier($event, false)\"  class=\"material-cust-small-button\">\r\n                <mat-icon class=\"material-cust-small-button-icon\">remove</mat-icon>\r\n            </button>\r\n            &nbsp;\r\n            {{scale_multiplier[multiplier_pos]}}\r\n            &nbsp;\r\n            <button mat-stroked-button (click)=\"click_multiplier($event, true)\"  class=\"material-cust-small-button\">\r\n                <mat-icon class=\"material-cust-small-button-icon\">add</mat-icon>\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <svg id=\"channel1\" width=\"800\" height=\"1500\"></svg>\r\n</div>"

/***/ }),

/***/ "./src/app/app.principal.content.component/eeg-content/eeg-content.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/eeg-content/eeg-content.component.ts ***!
  \**************************************************************************************/
/*! exports provided: EegContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EegContentComponent", function() { return EegContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_services_d3_d3_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../app.services/d3/d3.service */ "./src/app/app.services/d3/d3.service.ts");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EegContentComponent = /** @class */ (function () {
    function EegContentComponent(d3service) {
        this.d3service = d3service;
        this.channel_num = [2, 3, 4];
        this.scale_multiplier = [20, 50, 200];
        this.multiplier_pos = 0;
        this.current_data = null;
        this.color_scale = [
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
    }
    EegContentComponent.prototype.ngAfterContentInit = function () {
        /*
        this.handle_data = this.d3service.getPatientData('id_patient', 0)
        .subscribe(
            (response: Response) => {
                console.log('getpatient');
                console.log(response.json());
            });
        */
    };
    EegContentComponent.prototype.ngOnChanges = function () {
        if (this.Command_eeg == null) {
            if (this.current_data !== null) {
                this.paint_eeg('sujeto_base', this.CheckStatus()[0], this.CheckStatus()[1]);
            }
        }
        else {
            console.log(this.Command_eeg[0], this.Command_eeg[1]);
            if (this.Command_eeg[0] === 1) {
                this.delete_channel();
                this.current_data = null;
            }
            if (this.Command_eeg[0] === 2) {
                this.assignData('sujeto_base');
            }
            this.Command_eeg = null;
        }
    };
    EegContentComponent.prototype.click_multiplier = function (event, direction) {
        if (this.current_data === null) {
            console.log('please load patient first');
            return 0;
        }
        //        console.log(this.current_data);
        if (direction) {
            if (this.multiplier_pos === 2) {
                this.multiplier_pos = 2;
            }
            else {
                this.multiplier_pos++;
            }
        }
        if (!direction) {
            if (this.multiplier_pos === 0) {
                this.multiplier_pos = 0;
            }
            else {
                this.multiplier_pos--;
            }
        }
        this.paint_eeg('sujeto_base', this.CheckStatus()[0], this.CheckStatus()[1]);
    };
    EegContentComponent.prototype.delete_channel = function () {
        for (var n = 1; n < 2; n++) {
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#channel' + n).selectAll('path').remove();
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#channel' + n).selectAll('g').remove();
        }
    };
    EegContentComponent.prototype.paint_eeg = function (filename, width, height) {
        if (width === void 0) { width = 1100; }
        if (height === void 0) { height = 600; }
        var data = JSON.parse(this.current_data);
        var channel_array = [];
        for (var n = 1; n < 2; n++) {
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#channel' + n).selectAll('path').remove();
            d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#channel' + n).selectAll('g').remove();
            channel_array.push(d3__WEBPACK_IMPORTED_MODULE_2__["select"]('#channel' + n));
        }
        var duration = data['patientInfo']['duration'];
        var x_axis = false;
        var y_axis = false;
        for (var _i = 0, channel_array_1 = channel_array; _i < channel_array_1.length; _i++) {
            var sample = channel_array_1[_i];
            for (var j = 0; j < data['channels'].length; j++) {
                if (j === 0) {
                    x_axis = true;
                    y_axis = true;
                }
                else {
                    x_axis = false;
                    y_axis = false;
                }
                this.DrawChannel(sample, 'line_eeg_1', data['channels'][j], 0, duration, x_axis, y_axis, j, this.scale_multiplier[this.multiplier_pos], this.color_scale, width, height);
            }
        }
    };
    EegContentComponent.prototype.DrawChannel = function (channel, class_eeg, data_eeg, start_time, duration, x_axis_status, y_axis_status, multiplier, scale_multiplier, color_scale, width, height) {
        if (start_time === void 0) { start_time = 0; }
        if (duration === void 0) { duration = '0'; }
        if (x_axis_status === void 0) { x_axis_status = false; }
        if (y_axis_status === void 0) { y_axis_status = true; }
        if (multiplier === void 0) { multiplier = 1; }
        if (data_eeg.length !== 0) {
            var channel_data = data_eeg.data;
            var i = 0;
            var time_parse = d3__WEBPACK_IMPORTED_MODULE_2__["timeParse"]('%S');
            var time_format = d3__WEBPACK_IMPORTED_MODULE_2__["timeFormat"]('%S');
            var color_pos = 0;
            if (color_scale.length <= multiplier) {
                color_pos = color_scale.length;
            }
            else {
                color_pos = multiplier;
            }
            //        const chart_width     =   +channel.attr('width');
            //        const chart_height    =   +channel.attr('height');
            var chart_width = width;
            var chart_height = height;
            var padding = 20;
            for (var _i = 0, channel_data_1 = channel_data; _i < channel_data_1.length; _i++) {
                var sample = channel_data_1[_i];
                var sample_time = Math.round(1000 * i * (1 / data_eeg.samplefrequency)) / 1000;
                sample['time'] = sample_time;
                i++;
            }
            var x_scale_1 = d3__WEBPACK_IMPORTED_MODULE_2__["scaleLinear"]()
                .domain([
                0,
                d3__WEBPACK_IMPORTED_MODULE_2__["max"](channel_data, function (d) {
                    return d['time'];
                })
            ]).range([padding, chart_width - padding]);
            var y_scale_1 = d3__WEBPACK_IMPORTED_MODULE_2__["scaleLinear"]()
                .domain([
                d3__WEBPACK_IMPORTED_MODULE_2__["min"](channel_data, function (d) {
                    return d['value'] * 2;
                }),
                d3__WEBPACK_IMPORTED_MODULE_2__["max"](channel_data, function (d) {
                    return d['value'] * scale_multiplier * 0.8;
                })
            ])
                .range([chart_height - padding, padding]);
            for (var _a = 0, channel_data_2 = channel_data; _a < channel_data_2.length; _a++) {
                var sample = channel_data_2[_a];
                sample['value'] = sample['value'] + multiplier * scale_multiplier;
            }
            var line = d3__WEBPACK_IMPORTED_MODULE_2__["line"]()
                .x(function (d) {
                return x_scale_1(d['time']);
            })
                .y(function (d) {
                return y_scale_1(d['value']);
            });
            channel
                .attr('width', chart_width)
                .attr('height', chart_height);
            // Create Axes
            var x_axis = d3__WEBPACK_IMPORTED_MODULE_2__["axisBottom"](x_scale_1)
                .ticks(10);
            var y_axis = d3__WEBPACK_IMPORTED_MODULE_2__["axisLeft"](y_scale_1)
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
    };
    EegContentComponent.prototype.CheckStatus = function () {
        console.log(this.EEG_Status_eeg);
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
    };
    EegContentComponent.prototype.assignData = function (filename) {
        var _this = this;
        this.d3service.getPatientInfo(filename, this.current_data).subscribe(function (response) {
            _this.current_data = JSON.stringify(response);
            _this.paint_eeg('sujeto_base', _this.CheckStatus()[0], _this.CheckStatus()[1]);
        }, function (err) {
            console.log(err);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], EegContentComponent.prototype, "EEG_Status_eeg", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], EegContentComponent.prototype, "Command_eeg", void 0);
    EegContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-eeg-content',
            template: __webpack_require__(/*! ./eeg-content.component.html */ "./src/app/app.principal.content.component/eeg-content/eeg-content.component.html"),
            styles: [__webpack_require__(/*! ./eeg-content.component.css */ "./src/app/app.principal.content.component/eeg-content/eeg-content.component.css")]
        }),
        __metadata("design:paramtypes", [_app_services_d3_d3_service__WEBPACK_IMPORTED_MODULE_1__["D3Service"]])
    ], EegContentComponent);
    return EegContentComponent;
}());



/***/ }),

/***/ "./src/app/app.principal.content.component/plane-view/plane-view.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/plane-view/plane-view.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".td-content {\r\n    display: block;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    height: 250px;\r\n}"

/***/ }),

/***/ "./src/app/app.principal.content.component/plane-view/plane-view.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/plane-view/plane-view.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<img class=\"td-content\" src=\"{{ srcImage }}\" />"

/***/ }),

/***/ "./src/app/app.principal.content.component/plane-view/plane-view.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/plane-view/plane-view.component.ts ***!
  \************************************************************************************/
/*! exports provided: PlaneViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaneViewComponent", function() { return PlaneViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PlaneViewComponent = /** @class */ (function () {
    function PlaneViewComponent() {
    }
    PlaneViewComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], PlaneViewComponent.prototype, "srcImage", void 0);
    PlaneViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-plane-view',
            template: __webpack_require__(/*! ./plane-view.component.html */ "./src/app/app.principal.content.component/plane-view/plane-view.component.html"),
            styles: [__webpack_require__(/*! ./plane-view.component.css */ "./src/app/app.principal.content.component/plane-view/plane-view.component.css")]
        })
    ], PlaneViewComponent);
    return PlaneViewComponent;
}());



/***/ }),

/***/ "./src/app/app.principal.content.component/td-content/td-content.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/td-content/td-content.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".brain-viewer {\r\n    border:none;\r\n    height:100%;\r\n    width: 100%;\r\n}"

/***/ }),

/***/ "./src/app/app.principal.content.component/td-content/td-content.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/td-content/td-content.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<iframe class=\"brain-viewer\" src=\"http://localhost:8080\"></iframe>\r\n"

/***/ }),

/***/ "./src/app/app.principal.content.component/td-content/td-content.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/td-content/td-content.component.ts ***!
  \************************************************************************************/
/*! exports provided: TdContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdContentComponent", function() { return TdContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TdContentComponent = /** @class */ (function () {
    function TdContentComponent() {
    }
    TdContentComponent.prototype.ngOnInit = function () {
        this.ESIstatus_td = true;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], TdContentComponent.prototype, "ESIstatus_td", void 0);
    TdContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-td-content',
            template: __webpack_require__(/*! ./td-content.component.html */ "./src/app/app.principal.content.component/td-content/td-content.component.html"),
            styles: [__webpack_require__(/*! ./td-content.component.css */ "./src/app/app.principal.content.component/td-content/td-content.component.css")]
        })
    ], TdContentComponent);
    return TdContentComponent;
}());



/***/ }),

/***/ "./src/app/app.principal.content.component/td-control/td-control.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/td-control/td-control.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.principal.content.component/td-control/td-control.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/td-control/td-control.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  td-control works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/app.principal.content.component/td-control/td-control.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/td-control/td-control.component.ts ***!
  \************************************************************************************/
/*! exports provided: TdControlComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdControlComponent", function() { return TdControlComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TdControlComponent = /** @class */ (function () {
    function TdControlComponent() {
    }
    TdControlComponent.prototype.ngOnInit = function () {
    };
    TdControlComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-td-control',
            template: __webpack_require__(/*! ./td-control.component.html */ "./src/app/app.principal.content.component/td-control/td-control.component.html"),
            styles: [__webpack_require__(/*! ./td-control.component.css */ "./src/app/app.principal.content.component/td-control/td-control.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TdControlComponent);
    return TdControlComponent;
}());



/***/ }),

/***/ "./src/app/app.principal.content.component/topo-plot/topo-plot.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/app.principal.content.component/topo-plot/topo-plot.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.principal.content.component/topo-plot/topo-plot.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/app.principal.content.component/topo-plot/topo-plot.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  topo-plot works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/app.principal.content.component/topo-plot/topo-plot.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/app.principal.content.component/topo-plot/topo-plot.component.ts ***!
  \**********************************************************************************/
/*! exports provided: TopoPlotComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopoPlotComponent", function() { return TopoPlotComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TopoPlotComponent = /** @class */ (function () {
    function TopoPlotComponent() {
    }
    TopoPlotComponent.prototype.ngOnInit = function () {
    };
    TopoPlotComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-topo-plot',
            template: __webpack_require__(/*! ./topo-plot.component.html */ "./src/app/app.principal.content.component/topo-plot/topo-plot.component.html"),
            styles: [__webpack_require__(/*! ./topo-plot.component.css */ "./src/app/app.principal.content.component/topo-plot/topo-plot.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TopoPlotComponent);
    return TopoPlotComponent;
}());



/***/ }),

/***/ "./src/app/app.services/d3/d3.service.ts":
/*!***********************************************!*\
  !*** ./src/app/app.services/d3/d3.service.ts ***!
  \***********************************************/
/*! exports provided: D3Service */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D3Service", function() { return D3Service; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var ng_io__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-io */ "./node_modules/ng-io/fesm5/ng-io.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Operators


var markers;
var handleJSONFile = function (err, data) {
    markers = JSON.parse(data);
};
var D3Service = /** @class */ (function () {
    function D3Service(http, httptest, socket) {
        this.http = http;
        this.httptest = httptest;
        this.socket = socket;
    }
    D3Service.prototype.getPatientData = function (id_patient, initial_time) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        var route = id_patient;
        return this.httptest.get('./assets/data/sujeto_base_19_29.json');
    };
    D3Service.prototype.getServerData = function (id_patient, initial_time) {
        var headers = new _angular_http__WEBPACK_IMPORTED_MODULE_2__["Headers"]({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        var route = id_patient;
        return this.http.get('http://localhost:3000/tests');
    };
    D3Service.prototype.getPatientInfo = function (msg, current_data) {
        var payload = {
            'command': 'load_edf',
            'fileName': msg
        };
        this.socket.emit('load_edf', payload);
        return this.socket.fromEvent('load_edf');
    };
    D3Service = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _angular_http__WEBPACK_IMPORTED_MODULE_2__["Http"], ng_io__WEBPACK_IMPORTED_MODULE_3__["SocketIo"]])
    ], D3Service);
    return D3Service;
}());



/***/ }),

/***/ "./src/app/app.title.bar.component/app.title.bar.component.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/app.title.bar.component/app.title.bar.component.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".title-bar {\r\n  background-color: rgb(20, 20, 20);\r\n}\r\n\r\n.logo {\r\n  background-color: transparent;\r\n  width: 120px;\r\n  height: 70px;\r\n  padding: 0px 20px 0px 0px;\r\n}"

/***/ }),

/***/ "./src/app/app.title.bar.component/app.title.bar.component.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/app.title.bar.component/app.title.bar.component.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container title-bar\">\r\n  <div class=\"row main-container\">\r\n    <div class=\"col title-bar\"><h2>Universal Brain Viewer</h2></div>\r\n  </div>\r\n  <div class=\"row main-container\" style=\"padding: 0px 0px 0px 0px\">\r\n      <div class=\"col title-bar\"><p>Logo</p></div>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/app.title.bar.component/app.title.bar.component.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/app.title.bar.component/app.title.bar.component.component.ts ***!
  \******************************************************************************/
/*! exports provided: AppTitleBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppTitleBarComponent", function() { return AppTitleBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppTitleBarComponent = /** @class */ (function () {
    function AppTitleBarComponent() {
    }
    AppTitleBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-title-bar-component',
            template: __webpack_require__(/*! ./app.title.bar.component.component.html */ "./src/app/app.title.bar.component/app.title.bar.component.component.html"),
            styles: [__webpack_require__(/*! ./app.title.bar.component.component.css */ "./src/app/app.title.bar.component/app.title.bar.component.component.css")]
        })
    ], AppTitleBarComponent);
    return AppTitleBarComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Andres Documents\ubt_angular\ubt_angular\ubt-angular\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map